import React, { Component } from 'react';
import Map, { FullscreenControl, Layer, Marker } from 'react-map-gl';
import { Container, Row, Col, Card, Button } from 'react-bootstrap'
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import { db } from "../firebase";
import { useParams } from 'react-router-dom';
import * as layers from './MapView'
import pin from '../redPin.jpg';


export const waterLayer = {
    id: 'water',
    type: 'fill',
    source: 'mapbox',
    'source-layer': 'water',
    // filter: ['==', 'class', 'park'],
    paint: {
        'fill-color': "#00ffff"
    }
};

export class DisplayMap extends Component {

    constructor(props) {
        super(props);
        this.state = {
            MAPBOX_TOKEN: "pk.eyJ1IjoibWlocmV0IiwiYSI6ImNrejdldHp5djAzbGkyd3Jwa2Y1MHhuazEifQ.G5TBQJsZ8rDPRfpxqdp3Cw",
            loading: false,
            error: '',
            userId: props.userId,
            user: {},
            viewport: {
                width: 2000,
                height: 1000,
                latitude: 9.036000,
                longitude: 38.752300,
                zoom: 10,
            },
        };
    }

    async componentDidMount() {
        console.log('componet did mount');
        try {
            this.setState({ loading: true });
            const position = onSnapshot(doc(db, 'Location', this.state.userId), (doc) => {
                console.log(doc.data());
                console.log("position Changed");
                let updatedViewport = this.state.viewport;
                updatedViewport.latitude = doc.data().latitude;
                updatedViewport.longitude = doc.data().longitude;
                updatedViewport.zoom = 15;
                this.setState({ viewport: updatedViewport })
            })
        } catch {
            this.setState({ error: 'Failed to retrive user Location' })
        }
        this.setState({ loading: false });
    }

    async getUserLocation() {
        console.log(typeof this.state.userId)
        return await getDoc(doc(db, "Location", this.state.userId));
    }

    render() {
        return (
            <div>
              <p>{this.state.viewport.latitude}</p>
              <p>{this.state.viewport.longitude}</p>
                <Map
                    {...this.state.viewport}
                    onViewportChange={nextViewport => this.setState({ viewport: nextViewport })}
                    mapboxApiAccessToken={this.state.MAPBOX_TOKEN}
                    mapStyle="mapbox://styles/mapbox/streets-v9"
                >
                    <Marker longitude={this.state.viewport.longitude} latitude={this.state.viewport.latitude} draggable={true} anchor="top" >
                        {/* <h1>Location Here </h1> */}
                        <img src={pin} />
                    </Marker>
                    <FullscreenControl />
                    <Layer {...layers.waterLayer} />
                </Map>
                {/* <Map
                    initialViewState={this.state.viewport}
                    mapboxApiAccessToken={this.state.MAPBOX_TOKEN}
                    onViewportChange={nextViewport => this.setState({ viewport: nextViewport })}
                    style={{ width: 600, height: 400 }}
                    mapStyle="mapbox://styles/mapbox/streets-v9"
                /> */}
            </div>)
    }
}


export default function MapView() {
    let { id } = useParams();

    return (
        <Row>
            <Col>
                <DisplayMap userId={id}></DisplayMap>
            </Col>
        </Row>


    );
}
