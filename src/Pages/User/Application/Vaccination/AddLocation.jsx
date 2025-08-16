import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaInfoCircle,
  FaSpinner,
  FaExclamationTriangle,
  FaSearch,
  FaCrosshairs,
  FaHandPointer,
  FaHome,
  FaBriefcase,
  FaTag,
  FaBuilding,
  FaMapPin,
  FaUser,
  FaPhone,
} from "react-icons/fa";
import { FiArrowLeft, FiX } from "react-icons/fi";
import { GoogleMap, Marker, LoadScript } from "@react-google-maps/api";
import Button from "../../../../Components/Button";

const GOOGLE_MAPS_API_KEY = "AIzaSyCpkQgakarwsCcTv9A-Hp_u_8GySYRtinU";
const GOOGLE_LIBRARIES = ["places"];

const LOCAL_STORAGE_KEY = "userAddresses";

const AddLocation = () => {
  const { userid } = useParams();
  const navigate = useNavigate();

  const [coordinates, setCoordinates] = useState(null);
  const [mapCenter, setMapCenter] = useState({ lat: 28.6139, lng: 77.209 });
  const [markerPosition, setMarkerPosition] = useState(null);
  const [mapAccuracy, setMapAccuracy] = useState(null);
  const [address, setAddress] = useState("");
  const [shortAddress, setShortAddress] = useState("");
  const [useCustomLocation, setUseCustomLocation] = useState(false);
  const [locationStatus, setLocationStatus] = useState({
    loading: false,
    message: "",
    error: null,
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [showCustomLocationHelp, setShowCustomLocationHelp] = useState(false);
  const [locationConfirmed, setLocationConfirmed] = useState(false);
  const [addressDetails, setAddressDetails] = useState({
    houseBlockName: "",
    houseNoFloor: "",
    landmark: "",
    addressLabel: "Home",
    customLabel: "",
    receiverName: "",
    phoneNumber: "",
    deliveryInstructions: "",
  });
  const [mapsLoaded, setMapsLoaded] = useState(false);

  const geocoderRef = useRef(null);
  const autocompleteRef = useRef(null);
  const mapRef = useRef(null);
  const searchInputRef = useRef(null);

  const mapContainerStyle = {
    width: "100%",
    height: "60%",
  };

  // Load saved address if exists
  useEffect(() => {
    const savedAddresses =
      JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
    const currentUserAddress = savedAddresses.find(
      (addr) => addr.userId === userid
    );

    if (currentUserAddress) {
      const { coordinates, address, details } = currentUserAddress;
      setCoordinates(coordinates);
      setMarkerPosition(coordinates);
      setMapCenter(coordinates);
      setAddress(address);
      setShortAddress(extractShortAddress(address));
      setAddressDetails(details);
      setLocationConfirmed(true);
    }
  }, [userid]);

  // Extract short address from full address
  const extractShortAddress = (fullAddress) => {
    if (!fullAddress) return "";
    const parts = fullAddress.split(",");
    if (parts.length > 2) {
      return `${parts[0]}, ${parts[1]}`;
    }
    return fullAddress;
  };

  useEffect(() => {
    if (!useCustomLocation && !locationConfirmed) {
      fetchCurrentLocation();
      setShowCustomLocationHelp(false);
    } else if (useCustomLocation) {
      setLocationStatus({
        loading: false,
        message: "Search for a location or click on the map",
        error: null,
      });
      setShowCustomLocationHelp(true);
      setTimeout(() => {
        if (searchInputRef.current) {
          searchInputRef.current.focus();
        }
      }, 300);

      const timer = setTimeout(() => {
        setShowCustomLocationHelp(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [useCustomLocation, locationConfirmed]);

  const fetchCurrentLocation = () => {
    setLocationStatus({
      loading: true,
      message: "Determining your precise location...",
      error: null,
    });

    if (!navigator.geolocation) {
      setLocationStatus({
        loading: false,
        message: "Geolocation is not supported by your browser",
        error: "BROWSER_UNSUPPORTED",
      });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude, accuracy } = position.coords;
        setMapAccuracy(accuracy);
        await updateLocation({ lat: latitude, lng: longitude });

        setLocationStatus({
          loading: false,
          error: null,
        });
      },
      (error) => {
        let errorMessage = "Unable to determine your location";
        let errorType = "UNKNOWN_ERROR";

        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage =
              "Location access was denied. Please enable location permissions in your browser settings.";
            errorType = "PERMISSION_DENIED";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Location information is currently unavailable";
            errorType = "POSITION_UNAVAILABLE";
            break;
          case error.TIMEOUT:
            errorMessage =
              "The request to get location timed out. Please try again.";
            errorType = "TIMEOUT";
            break;
        }

        setLocationStatus({
          loading: false,
          message: errorMessage,
          error: errorType,
        });

        if (errorType === "PERMISSION_DENIED" || errorType === "TIMEOUT") {
          fetchIPBasedLocation();
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0,
      }
    );
  };

  const fetchIPBasedLocation = async () => {
    setLocationStatus({
      loading: true,
      message: "Trying to determine approximate location...",
      error: null,
    });

    try {
      const response = await fetch("https://ipapi.co/json/");
      const data = await response.json();

      if (data.latitude && data.longitude) {
        const fallbackCoords = { lat: data.latitude, lng: data.longitude };
        setMapAccuracy(50000);
        await updateLocation(fallbackCoords);

        setLocationStatus({
          loading: false,
          message:
            "Approximate location determined via IP (may be less accurate)",
          error: "LOW_ACCURACY",
        });
      } else {
        throw new Error("Invalid IP data");
      }
    } catch (err) {
      setLocationStatus({
        loading: false,
        message:
          "Could not determine location via IP. Please try manual location selection.",
        error: "IP_LOCATION_FAILED",
      });
    }
  };

  const updateLocation = async (newCoords) => {
    setCoordinates(newCoords);
    setMapCenter(newCoords);
    setMarkerPosition(newCoords);

    try {
      if (!geocoderRef.current && window.google && window.google.maps) {
        geocoderRef.current = new window.google.maps.Geocoder();
      }

      if (geocoderRef.current) {
        const response = await geocoderRef.current.geocode({
          location: newCoords,
        });

        if (response.results && response.results.length > 0) {
          const fullAddress = response.results[0].formatted_address;
          setAddress(fullAddress);
          setShortAddress(extractShortAddress(fullAddress));
        } else {
          setAddress("Selected location");
          setShortAddress("Selected location");
        }
      } else {
        setAddress("Selected location");
        setShortAddress("Selected location");
      }
    } catch (err) {
      console.error("Geocoding error:", err);
      setAddress("Selected location");
      setShortAddress("Selected location");
    }
  };

  const handleMapLoad = (map) => {
    mapRef.current = map;
    setMapsLoaded(true);

    if (window.google && window.google.maps) {
      const input = document.getElementById("custom-location-input");
      if (input) {
        autocompleteRef.current = new window.google.maps.places.Autocomplete(
          input,
          {
            fields: ["geometry", "formatted_address"],
            types: ["geocode"],
          }
        );

        autocompleteRef.current.addListener("place_changed", () => {
          const place = autocompleteRef.current.getPlace();
          if (place.geometry) {
            const newCoords = {
              lat: place.geometry.location.lat(),
              lng: place.geometry.location.lng(),
            };
            updateLocation(newCoords);
            setSearchQuery(place.formatted_address);
            setIsSearchFocused(false);
          }
        });
      }
    }
  };

  const handleMapClick = (e) => {
    if (useCustomLocation) {
      updateLocation({ lat: e.latLng.lat(), lng: e.latLng.lng() });
      setShowCustomLocationHelp(false);
    }
  };

  const handleMarkerDragEnd = (e) => {
    if (useCustomLocation) {
      updateLocation({ lat: e.latLng.lat(), lng: e.latLng.lng() });
    }
  };

  const createCustomMarkerIcon = () => {
    if (!window.google || !window.google.maps) return null;

    return {
      url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(
        `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${
          useCustomLocation ? "#7c3aed" : "#ef4444"
        }"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>`
      )}`,
      scaledSize: new window.google.maps.Size(40, 40),
      anchor: new window.google.maps.Point(20, 40),
    };
  };

  const confirmLocation = () => {
    if (!coordinates) {
      setLocationStatus({
        loading: false,
        message: "Please select or confirm your location",
        error: "LOCATION_REQUIRED",
      });
      return;
    }
    setLocationConfirmed(true);
  };

  const saveAddressToLocalStorage = () => {
    const addressData = {
      userId: userid,
      coordinates,
      address,
      details: addressDetails,
      timestamp: new Date().toISOString(),
    };

    const savedAddresses =
      JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
    const existingIndex = savedAddresses.findIndex(
      (addr) => addr.userId === userid
    );

    if (existingIndex >= 0) {
      savedAddresses[existingIndex] = addressData;
    } else {
      savedAddresses.push(addressData);
    }

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(savedAddresses));

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser) {
      const updatedUser = {
        ...currentUser,
        location: addressData,
      };
      localStorage.setItem("currentUser", JSON.stringify(updatedUser));
    }

    navigate("/app/vaccination/order-summary");
  };

  const clearSearch = () => {
    setSearchQuery("");
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  const toggleLocationMode = () => {
    setUseCustomLocation(!useCustomLocation);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddressDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLabelChange = (label) => {
    setAddressDetails((prev) => ({
      ...prev,
      addressLabel: label,
      customLabel: label === "Other" ? prev.customLabel : "",
    }));
  };

  return (
    <div className="user-location-page">
      <LoadScript
        googleMapsApiKey={GOOGLE_MAPS_API_KEY}
        libraries={GOOGLE_LIBRARIES}
        onLoad={() => setMapsLoaded(true)}
      >
        <div className="vaccination-summary-hero">
          <div className="hero-top-bar">
            <button
              className="icon-button"
              onClick={() => window.history.back()}
              aria-label="Go back"
            >
              <FiArrowLeft className="hero-icon" />
            </button>
            <h1 className="hero-title">Order Summary</h1>
          </div>

          <div
            className={`search-bar hero-search ${
              isSearchFocused ? "focused" : ""
            }`}
          >
            <div className="search-input-wrapper">
              <FaSearch className="search-icon" />
              <input
                id="custom-location-input"
                ref={searchInputRef}
                type="text"
                placeholder="Search for a location or address..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                className="user-location-search-input"
              />
              {searchQuery && (
                <button
                  className="clear-search-button"
                  onClick={clearSearch}
                  aria-label="Clear search"
                >
                  <FiX />
                </button>
              )}
            </div>
          </div>
        </div>

        {locationStatus.loading && (
          <div className="status-indicator loading">
            <FaSpinner className="spinner-icon" />
            <span>{locationStatus.message}</span>
          </div>
        )}

        {locationStatus.error && !locationStatus.loading && (
          <div
            className={`status-indicator ${
              locationStatus.error === "LOW_ACCURACY" ? "warning" : "error"
            }`}
          >
            <FaExclamationTriangle className="warning-icon" />
            <span>{locationStatus.message}</span>
          </div>
        )}

        <div className="map-container">
          {mapsLoaded ? (
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={mapCenter}
              zoom={15}
              onClick={handleMapClick}
              onLoad={handleMapLoad}
              options={{
                streetViewControl: false,
                mapTypeControl: false,
                fullscreenControl: false,
                zoomControl: false,
                clickableIcons: false,
                styles: [
                  {
                    featureType: "poi",
                    elementType: "labels",
                    stylers: [{ visibility: "off" }],
                  },
                  {
                    featureType: "transit",
                    elementType: "labels",
                    stylers: [{ visibility: "off" }],
                  },
                  {
                    featureType: "landscape",
                    elementType: "labels",
                    stylers: [{ visibility: "off" }],
                  },
                  {
                    featureType: "road",
                    elementType: "labels",
                    stylers: [{ visibility: "simplified" }],
                  },
                  {
                    featureType: "water",
                    elementType: "geometry",
                    stylers: [{ color: "#e2e8f0" }],
                  },
                ],
              }}
            >
              {markerPosition && (
                <Marker
                  position={markerPosition}
                  draggable={useCustomLocation}
                  onDragEnd={handleMarkerDragEnd}
                  icon={createCustomMarkerIcon()}
                />
              )}
            </GoogleMap>
          ) : (
            <div className="map-loading">
              <FaSpinner className="spinner-icon" />
              <span>Loading map...</span>
            </div>
          )}
        </div>

        {!locationConfirmed ? (
          <div className="action-panel">
            <div className="address-display">
              <FaMapMarkerAlt className="address-icon" />
              <div className="address-text">
                <strong>{address || "No location selected"}</strong>
                {mapAccuracy && (
                  <span
                    className={`accuracy-indicator ${
                      mapAccuracy < 100
                        ? "high"
                        : mapAccuracy < 1000
                        ? "medium"
                        : "low"
                    }`}
                  >
                    {mapAccuracy < 100
                      ? "High accuracy"
                      : mapAccuracy < 1000
                      ? "Medium accuracy"
                      : "Low accuracy"}
                  </span>
                )}
              </div>
              <button
                className={`location-mode-toggle ${
                  useCustomLocation ? "active" : ""
                }`}
                onClick={toggleLocationMode}
              >
                {useCustomLocation ? "Default" : "Change"}
              </button>
            </div>

            <button
              onClick={confirmLocation}
              disabled={!coordinates}
              className="confirm-button"
            >
              Confirm Location
            </button>
          </div>
        ) : (
          <div className="details-panel">
            <div className="section-header">
              <h3>📍 Address Details</h3>
            </div>

            <div className="confirmed-address">
              <FaMapMarkerAlt className="address-icon" />
              <div className="address-text">
                <strong>{shortAddress}</strong>{" "}
                <button
                  className="change-location-button"
                  onClick={() => setLocationConfirmed(false)}
                >
                  Change
                </button>
              </div>
            </div>

            <div className="details-form">
              {[
                {
                  id: "houseBlockName",
                  icon: <FaBuilding />,
                  label: "House / Block Name",
                  placeholder: "e.g. Sunshine Apartments",
                },
                {
                  id: "houseNoFloor",
                  icon: <FaBuilding />,
                  label: "House No. & Floor",
                  placeholder: "e.g. B-502, 5th Floor",
                },
                {
                  id: "landmark",
                  icon: <FaMapPin />,
                  label: "Landmark (optional)",
                  placeholder: "e.g. Near Central Park",
                },
                {
                  id: "receiverName",
                  icon: <FaUser />,
                  label: "Receiver's Name",
                  placeholder: "Full name of the receiver",
                },
                {
                  id: "phoneNumber",
                  icon: <FaPhone />,
                  label: "Phone Number",
                  placeholder: "10-digit mobile number",
                  type: "tel",
                },
                {
                  id: "deliveryInstructions",
                  label: "Delivery Instructions (optional)",
                  placeholder: "e.g. Ring doorbell, call when arrived",
                },
              ].map(({ id, icon, label, placeholder, type }) => (
                <div className="form-group" key={id}>
                  <label htmlFor={id}>
                    {icon && <span className="input-icon">{icon}</span>} {label}
                  </label>
                  <input
                    type={type || "text"}
                    id={id}
                    name={id}
                    value={addressDetails[id]}
                    onChange={handleInputChange}
                    placeholder={placeholder}
                  />
                </div>
              ))}

              <div className="tag-section">
                <label>Address Label</label>
                <div className="tag-options">
                  {[
                    { label: "Home", icon: <FaHome /> },
                    { label: "Work", icon: <FaBriefcase /> },
                    { label: "Other", icon: <FaTag /> },
                  ].map(({ label, icon }) => (
                    <button
                      key={label}
                      className={`tag-option ${
                        addressDetails.addressLabel === label ? "active" : ""
                      }`}
                      onClick={() => handleLabelChange(label)}
                    >
                      {icon} {label}
                    </button>
                  ))}
                </div>
                {addressDetails.addressLabel === "Other" && (
                  <div className="form-group">
                    <input
                      type="text"
                      name="customLabel"
                      value={addressDetails.customLabel}
                      onChange={handleInputChange}
                      placeholder="Enter custom label (e.g. Parents' House)"
                    />
                  </div>
                )}
              </div>

              <button
                onClick={saveAddressToLocalStorage}
                className="save-button"
              >
                Save Address
              </button>
            </div>
          </div>
        )}
      </LoadScript>
      <style>
        {`
          .user-location-page {
            background-color: #f8fafc;
            min-height: 100vh;
            color: #1e293b;
            padding-bottom: 120px;
          }
          
          .vaccination-summary-hero {
            background: linear-gradient(to bottom, #4a90e2, #8c60e2);
            padding: 20px;
            border-radius: 0 0 32px 32px;
            color: white;
            position: relative;
            box-shadow: 0 10px 30px rgba(74, 144, 226, 0.2);
          }
          
          .hero-top-bar {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            text-align: left;
            gap: 1rem;
          }
          
          .icon-button {
            background: rgba(255, 255, 255, 0.2);
            border: none;
            width: 36px;
            height: 36px;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            backdrop-filter: blur(5px);
            transition: all 0.3s ease;
            cursor: pointer;
          }
          
          .icon-button:hover {
            background: rgba(255, 255, 255, 0.3);
            transform: translateY(-2px);
          }
          
          .hero-icon {
            font-size: 18px;
            color: white;
          }
          
          .hero-title {
            font-size: 1rem;
            font-weight: 500;
            margin: 0;
            flex: 1;
            line-height: 1.2;
          }
          
          .hero-search {
            position: absolute;
            bottom: -26px;
            left: 50%;
            transform: translateX(-50%);
            width: calc(100% - 40px);
            max-width: 520px;
            z-index: 3;
          }
          
          .search-bar {
            backdrop-filter: blur(12px);
            background: rgba(255, 255, 255, 0.7);
            border-radius: 14px;
            padding: 0;
            box-shadow: 0 4px 18px rgba(0, 0, 0, 0.12);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }
          
          .search-bar.focused {
            transform: translateX(-50%) translateY(-2px) scale(1.02);
            box-shadow: 0 6px 22px rgba(0, 0, 0, 0.18);
          }
          
          .search-input-wrapper {
            position: relative;
            width: 100%;
          }
          
          .user-location-search-input {
            width: 100%;
            padding: 14px 44px;
            border-radius: 14px;
            border: none;
            font-size: 15px;
            background: transparent;
            color: #1f2937;
          }
          
          .user-location-search-input::placeholder {
            color: #6b7280;
          }
          
          .user-location-search-input:focus {
            outline: none;
          }
          
          .search-icon {
            position: absolute;
            left: 14px;
            top: 50%;
            transform: translateY(-50%);
            color: #6b7280;
            font-size: 16px;
            pointer-events: none;
          }
          
          .clear-search-button {
            position: absolute;
            right: 14px;
            top: 50%;
            transform: translateY(-50%);
            background: none;
            border: none;
            color: #6b7280;
            font-size: 18px;
            cursor: pointer;
            padding: 4px;
            border-radius: 50%;
            transition: all 0.2s ease;
          }
          
          .clear-search-button:hover {
            color: #374151;
            background: rgba(0, 0, 0, 0.05);
          }
          
          @media (max-width: 480px) {
            .user-location-search-input {
              font-size: 14px;
              padding: 12px 40px;
            }
          }
          
          .status-indicator {
            position: fixed;
            top: 140px;
            left: 50%;
            transform: translateX(-50%);
            padding: 12px 16px;
            border-radius: 8px;
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 14px;
            z-index: 5;
            max-width: 90%;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          }
          
          .status-indicator.loading {
            background: rgba(255, 255, 255, 0.95);
            color: #334155;
          }
          
          .status-indicator.error {
            background: rgba(239, 68, 68, 0.95);
            color: white;
          }
          
          .status-indicator.warning {
            background: rgba(245, 158, 11, 0.95);
            color: white;
          }
          
          .spinner-icon {
            animation: spin 1s linear infinite;
          }
          
          @keyframes spin {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }
          
          .warning-icon {
            font-size: 16px;
          }
          
          .map-container {
            width: 100%;
            height: 100vh;
            position: fixed;
          }
          
          .action-panel {
            position: fixed;
            bottom: 0;
            left: 0;
            width: 100%;
            background: rgba(255, 255, 255, 0.85);
            backdrop-filter: blur(14px);
            padding: 20px 16px;
            border-radius: 20px 20px 0 0;
            box-shadow: 0 -6px 30px rgba(0, 0, 0, 0.15);
            z-index: 10;
            animation: slideUp 0.3s ease-out;
          }
          
          .address-display {
            display: flex;
            align-items: center;
            gap: 12px;
            margin-bottom: 16px;
            padding: 14px 16px;
            background: #f1f5f9;
            border-radius: 14px;
            transition: background 0.2s ease;
          }
          
          .address-display:hover {
            background: #e2e8f0;
          }
          
          .address-icon {
            color: #6366f1;
            font-size: 20px;
          }
          
          .address-text {
            flex: 1;
            font-size: 14px;
            color: #1e293b;
            line-height: 1.4;
          }
          
          .accuracy-indicator {
            display: block;
            font-size: 12px;
            margin-top: 4px;
            font-weight: 500;
          }
          
          .accuracy-indicator.high { color: #22c55e; }
          .accuracy-indicator.medium { color: #f59e0b; }
          .accuracy-indicator.low { color: #ef4444; }
          
          .location-mode-toggle {
            padding: 6px 14px;
            font-size: 13px;
            border-radius: 20px;
            border: none;
            background: #e2e8f0;
            color: #475569;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.2s ease;
          }
          
          .location-mode-toggle.active {
            background: linear-gradient(135deg, #6366f1, #9333ea);
            color: white;
          }
          
          .location-mode-toggle:hover {
            transform: scale(1.05);
          }
          
          .confirm-button {
            width: 100%;
            padding: 14px;
            border-radius: 14px;
            font-weight: 600;
            font-size: 16px;
            background: linear-gradient(135deg, #6366f1, #9333ea);
            color: white;
            border: none;
            cursor: pointer;
            transition: transform 0.2s ease, opacity 0.2s ease;
          }
          
          .confirm-button:disabled {
            opacity: 0.5;
            cursor: not-allowed;
          }
          
          .confirm-button:hover:not(:disabled) {
            transform: scale(1.02);
          }
          
       .details-panel {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(18px);
  padding: 20px 16px;
  border-radius: 20px 20px 0 0;
  box-shadow: 0 -6px 30px rgba(0, 0, 0, 0.15);
  z-index: 10;
  animation: slideUp 0.35s ease-out;
  max-height: 80vh;
  overflow-y: auto;
}
/* Section Header */
.section-header {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
}
.section-header h3 {
  font-size: 16px;
  font-weight: 600;
  color: #334155;
  letter-spacing: 0.3px;
  display: flex;
  align-items: center;
  gap: 6px;
}
/* Address box */
.confirmed-address {
   display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
  padding: 14px 16px;
  background: rgba(248, 250, 252, 0.9);
  backdrop-filter: blur(10px);
  border-radius: 14px;
  border: 1px solid #e2e8f0;
  transition: background 0.2s ease, transform 0.2s ease;
}

.confirmed-address:hover {
  background: rgba(241, 245, 249, 0.9);
  transform: translateY(-1px);
}
.address-icon {
  color: #6366f1;
  font-size: 18px;
}
.change-location-button {
 font-size: 13px;
  color: #6366f1;
  background: none;
  border: none;
  text-decoration: underline;
  cursor: pointer;
  padding: 0;
  transition: color 0.2s ease;
}
.change-location-button:hover {
  color: #4f46e5;
}
/* Form */
.details-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.form-group label {
  font-size: 14px;
  font-weight: 500;
  color: #334155;
  display: flex;
  align-items: center;
  gap: 8px;
}
.input-icon {
  color: #64748b;
  font-size: 14px;
}
.form-group input {
  padding: 12px 16px;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  font-size: 15px;
  background: #f8fafc;
  transition: all 0.2s ease;
}
.form-group input:focus {
  outline: none;
  border-color: #6366f1;
  background: white;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2);
}

/* Tag options */
.tag-section label {
  font-size: 14px;
  font-weight: 500;
  color: #334155;
  margin-bottom: 8px;
}
.tag-options {
  display: flex;
  gap: 8px;
  margin-bottom:1rem;
}
.tag-option {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 10px;
  border: 1px solid #e2e8f0;
  border-radius: 50px;
  background: #f8fafc;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
}
.tag-option:hover {
  background: #e2e8f0;
}
.tag-option.active {
  background: linear-gradient(135deg, #6366f1, #9333ea);
  color: white;
  border-color: transparent;
}

/* Save button */
.save-button {
  width: 100%;
  padding: 14px;
  border-radius: 14px;
  font-weight: 600;
  font-size: 16px;
  background: linear-gradient(135deg, #6366f1, #9333ea);
  color: white;
  border: none;
  cursor: pointer;
  margin-top: 8px;
  transition: transform 0.2s, box-shadow 0.2s;
}
.save-button:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 15px rgba(99, 102, 241, 0.4);
}

/* Animation */
@keyframes slideUp {
  from { transform: translateY(100%); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

@media (min-width: 768px) {
  .details-panel {
    left: 50%;
    transform: translateX(-50%);
    width: 80%;
    max-width: 600px;
    bottom: 20px;
    border-radius: 20px;
  }
}

        `}
      </style>
    </div>
  );
};

export default AddLocation;
