import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { Map, TileLayer, Marker } from 'react-leaflet'
import Dropzone from 'components/Dropzone';
import api from 'services/api';
import logo from 'assets/logo.svg';
import axios from 'axios';
import { LeafletMouseEvent, Point } from 'leaflet';
import './styles.css';

export default function CreatePoint() {

  const history = useHistory();

  const [items, setItems] = useState<Item[]>([]);
  const [states, setStates] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [mapCordinates, setMapCordinates] = useState<[number, number]>([0, 0]);
  const [initialCordinates, setInitialCordinates] = useState<[number, number]>([0, 0]);
  const [formData, setFormData] = useState({} as PointFormData);
  const [selectedItems, setSelectedItems] = useState<Array<number>>([]);
  const [selectedFile, setSelectedFile] = useState<File>();

  async function handlePointSubmit(event: FormEvent) {
    event?.preventDefault();
    
    const data = new FormData();

    data.append('name', formData.name);
    data.append('email', formData.email);
    data.append('whatsapp', formData.whatsapp);
    data.append('latitude', String(mapCordinates[0]));
    data.append('longitude', String(mapCordinates[1]));
    data.append('city', selectedCity);
    data.append('uf', selectedState);
    data.append('items', selectedItems.join(','));

    if (selectedFile) data.append('image', selectedFile);

    try {
      await api.post('/points', data);

      alert('Point successfull submited!');

      history.push('/');
    } catch(err) {
      alert('Sorry, could not do that now, try again later.');
    }
  }

  function handleItemSelection(item_id: number) {
    if (selectedItems.includes(item_id))
      setSelectedItems(selectedItems.filter(id => id !== item_id));
    else
      setSelectedItems([ ...selectedItems, item_id ]);
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value
    });
  }

  function handleMapClick(event: LeafletMouseEvent) {
    setMapCordinates([
      event.latlng.lat,
      event.latlng.lng
    ]);
  }

  function handleUserGeolocation() {
    navigator.geolocation.getCurrentPosition(pos => setInitialCordinates([pos.coords.latitude, pos.coords.longitude]));
  }

  async function fetchItems() {
    const res = await api.get('/items');

    setItems(res.data);
  }

  async function fetchStates() {
    const res = await axios.get<IBGEStateResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados');

    setStates(res.data.map(state => state.sigla))
  }

  async function fetchCities() {
    const res = await axios.get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedState}/municipios`);

    setCities(res.data.map(state => state.nome))
  }

  useEffect(() => {
    handleUserGeolocation();
    fetchItems();
    fetchStates();
  }, []);

  useEffect(() => {
    fetchCities();
  }, [selectedState]);

  return (
    <div id="page-create-point">
      
      <header>
        <img src={logo} alt="Ecollect" />

        <Link to="/">
          <FiArrowLeft />
          Back to home
        </Link>
      </header>

      <form onSubmit={handlePointSubmit}>
        <h1>Subscribe of <br />collect point</h1>

        <fieldset>
          <legend>
            <h2>Data</h2>
          </legend>

          <div className="field">
            <label htmlFor="name">Name of the entity</label>
            <input 
              type="text"
              name="name"
              id="name"
              onChange={handleInputChange}
            />
          </div>

          <div className="field-group">
            <div className="field">
              <label htmlFor="email">Email of the entity</label>
              <input 
                type="email"
                name="email"
                id="email"
                onChange={handleInputChange}
              />
            </div>

            <div className="field">
              <label htmlFor="whatsapp">Whatsapp of the entity</label>
              <input 
                type="text"
                name="whatsapp"
                id="whatsapp"
                onChange={handleInputChange}
              />
            </div>
          </div>
        </fieldset>

        <Dropzone onFileUploaded={setSelectedFile} />

        <fieldset>
          <legend>
            <h2>Address</h2>
            <span>Select the address on map</span>
          </legend>

          <Map center={initialCordinates} zoom={15} onclick={handleMapClick}>
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <Marker position={mapCordinates} />
          </Map>

          <div className="field-group">

            <div className="field">
              <label htmlFor="uf">State (UF)</label>
              <select name="uf" id="uf" onChange={e => setSelectedState(e.target.value)}>
                <option value="0">Select a state</option>
                {states.map(state => (
                  <option key={state}>{state}</option>
                ))}
              </select>
            </div>

            <div className="field">
              <label htmlFor="city">City</label>
              <select name="city" id="city" onChange={e => setSelectedCity(e.target.value)}>
                <option value="0">Select a city</option>
                {cities.map(city => (
                  <option key={city}>{city}</option>
                ))}
              </select>
            </div>

          </div>

        </fieldset>

        <fieldset>
          <legend>
            <h2>Collect items</h2>
            <span>Select one or more items bellow</span>
          </legend>

          <ul className="items-grid">
            {items.map(item => (
              <li 
                key={item.id} 
                onClick={() => handleItemSelection(item.id)}
                className={selectedItems.includes(item.id) ? 'selected' : ''}
              >
                <img src={item.image} alt={item.title} />
                <span>{item.title}</span>
              </li>
            ))}
          </ul>
        </fieldset>

        <button type="submit">Submit collect point</button>
      </form>
    </div>
  );
}