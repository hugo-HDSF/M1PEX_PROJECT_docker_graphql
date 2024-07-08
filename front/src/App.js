import React from 'react';
import {ApolloProvider} from '@apollo/client';
import client from './graphql/client';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import MoviesPage from './pages/MoviesPage';
import AddMoviePage from './pages/AddMoviePage';
import ModifyMoviePage from './pages/ModifyMoviePage';
import DeleteMoviePage from './pages/DeleteMoviePage';

import RealisatorsPage from './pages/RealisatorsPage';
import AddRealisatorPage from './pages/AddRealisatorPage';
import ModifyRealisatorPage from './pages/ModifyRealisatorPage';
import DeleteRealisatorPage from './pages/DeleteRealisatorPage';


import SagasPage from './pages/SagasPage';
import AddSagaPage from './pages/AddSagaPage';
import ModifySagaPage from './pages/ModifySagaPage';
import DeleteSagaPage from './pages/DeleteSagaPage';

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="App">
          <header>
            <h1>Movies Management App</h1>
            <nav>
              <ul>
                <li>
                  <Link to="/realisators">Realisators</Link>
                  <ul>
                    <li><Link to="/add-realisator">Add Realisator</Link></li>
                    <li><Link to="/modify-realisator">modify Realisator</Link>
                    </li>
                    <li><Link to="/delete-realisator">delete Realisator</Link>
                    </li>
                  </ul>
                </li>
                <li>
                  <Link to="/movies">Movies</Link>
                  <ul>
                    <li><Link to="/add-movie">AddMovie</Link></li>
                    <li><Link to="/modify-movie">Modify Movie</Link></li>
                    <li><Link to="/delete-movie">Delete Movie</Link></li>
                  </ul>
                </li>
                <li>
                  <Link to="/sagas">Sagas</Link>
                  <ul>
                    <li><Link to="/add-saga">Add Saga</Link></li>
                    <li><Link to="/modify-saga">Modify Saga</Link></li>
                    <li><Link to="/delete-saga">Delete Saga</Link></li>
                  </ul>
                </li>
              </ul>
            </nav>
          </header>
          <main>
            <Routes>
              <Route path="/realisators" element={<RealisatorsPage/>}/>
              <Route path="/add-realisator" element={<AddRealisatorPage/>}/>
              <Route path="/delete-realisator"
                     element={<DeleteRealisatorPage/>}/>
              <Route path="/modify-realisator"
                     element={<ModifyRealisatorPage/>}/>
              
              <Route path="/movies" element={<MoviesPage/>}/>
              <Route path="/add-movie" element={<AddMoviePage/>}/>
              <Route path="/delete-movie" element={<DeleteMoviePage/>}/>
              <Route path="/modify-movie" element={<ModifyMoviePage/>}/>
              
              <Route path="/sagas" element={<SagasPage/>}/>
              <Route path="/add-saga" element={<AddSagaPage/>}/>
              <Route path="/delete-saga" element={<DeleteSagaPage/>}/>
              <Route path="/modify-saga" element={<ModifySagaPage/>}/>
            </Routes>
          
          </main>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
