import React from 'react';
import { FiLogIn } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import logo from 'assets/logo.svg';

import './styles.css'

export default function Home() {
  return (
    <div id="page-home">
      <div className="content">
        <header>
          <img src={logo} alt="Ecoleta" />
        </header>

        <main>
          <h1>Your marketplace of residues collection.</h1>
          <p>We help people to find collect points with efficiency.</p>

          <Link to="/create-point">
            <span>
              <FiLogIn />
            </span>
            <strong>Register</strong>
          </Link>
        </main>
      </div>
    </div>
  );
}