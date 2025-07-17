import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaInfoCircle,
  FaSpinner,
  FaExclamationTriangle,
  FaSearchLocation,
} from "react-icons/fa";
import { GoogleMap, Marker, LoadScript } from "@react-google-maps/api";
import Button from "../../../../Components/Button";
import "./style.css";

const GOOGLE_MAPS_API_KEY = "AIzaSyCpkQgakarwsCcTv9A-Hp_u_8GySYRtinU";
const GOOGLE_LIBRARIES = ["places"];

const UserLocation = () => {
  const { userid } = useParams();
  const navigate = useNavigate();

  const [coordinates, setCoordinates] = useState(null);
  const [mapCenter, setMapCenter] = useState({ lat: 28.6139, lng: 77.209 });
  const [markerPosition, setMarkerPosition] = useState(null);
  const [mapAccuracy, setMapAccuracy] = useState(null);
  const [address, setAddress] = useState("");
  const [useCustomLocation, setUseCustomLocation] = useState(false);
  const [locationStatus, setLocationStatus] = useState({
    loading: false,
    message: "",
    error: null,
  });
  const [searchQuery, setSearchQuery] = useState("");

  const geocoderRef = useRef(null);
  const autocompleteRef = useRef(null);
  const mapRef = useRef(null);

  const mapContainerStyle = {
    width: "100%",
    height: "500px",
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  };

  useEffect(() => {
    if (!useCustomLocation) {
      fetchCurrentLocation();
    } else {
      setLocationStatus({
        loading: false,
        message: "Search for a location or click on the map",
        error: null,
      });
    }
  }, [useCustomLocation]);

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
      if (!geocoderRef.current && window.google) {
        geocoderRef.current = new window.google.maps.Geocoder();
      }

      if (geocoderRef.current) {
        const response = await geocoderRef.current.geocode({
          location: newCoords,
        });

        if (response.results && response.results.length > 0) {
          setAddress(response.results[0].formatted_address);
        } else {
          setAddress("Selected location");
        }
      }
    } catch (err) {
      setAddress("Selected location");
    }
  };

  const handleMapLoad = (map) => {
    mapRef.current = map;

    if (window.google) {
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
          }
        });
      }
    }
  };

  const handleMapClick = (e) => {
    if (useCustomLocation) {
      updateLocation({ lat: e.latLng.lat(), lng: e.latLng.lng() });
    }
  };

  const handleMarkerDragEnd = (e) => {
    if (useCustomLocation) {
      updateLocation({ lat: e.latLng.lat(), lng: e.latLng.lng() });
    }
  };

  const saveLocationAndContinue = () => {
    if (!coordinates) {
      setLocationStatus({
        loading: false,
        message: "Please select or confirm your location",
        error: "LOCATION_REQUIRED",
      });
      return;
    }

    console.log("📍 Selected Coordinates:", coordinates);

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const updatedUser = {
      ...currentUser,
      location: {
        coordinates,
      },
    };

    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = existingUsers.map((user) =>
      user.userId === currentUser?.userId ? updatedUser : user
    );

    localStorage.setItem("currentUser", JSON.stringify(updatedUser));

    // ✅ Navigate to /app/:userid
    navigate("/app");
  };

  return (
    <div className="location-page">
      <LoadScript
        googleMapsApiKey={GOOGLE_MAPS_API_KEY}
        libraries={GOOGLE_LIBRARIES}
      >
        <div className="location-container">
          <div className="location-header">
            <h1 className="location-title">Set Your Location</h1>
            <p className="location-subtitle">
              {useCustomLocation
                ? "Search for an address or click on the map"
                : "We'll use your location to provide personalized services"}
            </p>
          </div>

          <div className="location-mode-toggle">
            <Button
              type={useCustomLocation ? "secondary" : "primary"}
              onClick={() => setUseCustomLocation(false)}
              icon={<FaMapMarkerAlt />}
            >
              Current Location
            </Button>
            <Button
              type={useCustomLocation ? "primary" : "secondary"}
              onClick={() => setUseCustomLocation(true)}
              icon={<FaMapMarkerAlt />}
            >
              Custom Location
            </Button>
          </div>

          {mapAccuracy && mapAccuracy > 1000 && (
            <div className="accuracy-warning">
              <FaExclamationTriangle className="warning-icon" />
              <span>
                Warning: Location accuracy is low (~{Math.round(mapAccuracy)}m
                radius)
              </span>
            </div>
          )}

          <div className="map-wrapper">
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
                zoomControl: true,
                clickableIcons: false,
                styles: [
                  {
                    featureType: "poi",
                    elementType: "labels",
                    stylers: [{ visibility: "off" }],
                  },
                ],
              }}
            >
              {markerPosition && (
                <Marker
                  position={markerPosition}
                  draggable={useCustomLocation}
                  onDragEnd={handleMarkerDragEnd}
                  icon={{
                    url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(
                      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${
                        useCustomLocation ? "#712fdd" : "#ee4368ff"
                      }"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>`
                    )}`,
                    scaledSize: new window.google.maps.Size(40, 40),
                    anchor: new window.google.maps.Point(20, 40),
                  }}
                />
              )}
            </GoogleMap>
          </div>

          {address && (
            <div className="selected-address">
              <FaMapMarkerAlt className="address-icon" />
              <span>{address}</span>
            </div>
          )}

          <div className="location-actions">
            <Button
              type="primary"
              onClick={saveLocationAndContinue}
              disabled={!coordinates}
            >
              Confirm Location
            </Button>
          </div>
        </div>
      </LoadScript>
    </div>
  );
};

export default UserLocation;
