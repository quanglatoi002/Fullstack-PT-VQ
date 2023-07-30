import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const DetailPost = () => {
    const mapStyles = {
        height: '400px',
        width: '100%',
    };
    const defaultCenter = {
        lat: 37.7749, // Vĩ độ
        lng: -122.4194, // Kinh độ
    };

    return (
        <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
            <GoogleMap mapContainerStyle={mapStyles} zoom={13} center={defaultCenter}>
                <Marker position={defaultCenter} />
            </GoogleMap>
        </LoadScript>
    );
};

export default DetailPost;
