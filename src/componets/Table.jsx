import React, { useContext } from 'react';
import GlobalContext from '../context/GlobalContext';

export default function Table() {
  const { planetsList } = useContext(GlobalContext);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th className="headTable">Name</th>
            <th className="headTable">Climate</th>
            <th className="headTable">Terrain</th>
            <th className="headTable">Gravity</th>
            <th className="headTable">Surface Water</th>
            <th className="headTable">Rotation Period</th>
            <th className="headTable">Orbital Period</th>
            <th className="headTable">Diameter</th>
            <th className="headTable">Population</th>
            <th className="headTable">Films</th>
            <th className="headTable">Created</th>
            <th className="headTable">Edited</th>
            <th className="headTable">Url</th>
          </tr>
        </thead>
        <tbody>
          {planetsList !== undefined ? (
            planetsList.map(({
              name,
              rotation_period: rotationPeriod,
              orbital_period: orbitalPeriod,
              diameter,
              climate,
              gravity,
              terrain,
              surface_water: surfaceWater,
              population,
              films,
              created,
              edited,
              url,
            }) => (
              <tr key={ name } className="tr">
                <td className="contentTable">{name}</td>
                <td className="contentTable">{rotationPeriod}</td>
                <td className="contentTable">{orbitalPeriod}</td>
                <td className="contentTable">{diameter}</td>
                <td className="contentTable">{climate}</td>
                <td className="contentTable">{gravity}</td>
                <td className="contentTable">{terrain}</td>
                <td className="contentTabled">{surfaceWater}</td>
                <td className="contentTable">{population}</td>
                <td className="contentTable">{films}</td>
                <td className="contentTable">{created}</td>
                <td className="contentTable">{edited}</td>
                <td className="contentTable">{url}</td>
              </tr>
            ))
          ) : (
            <tr>{}</tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
