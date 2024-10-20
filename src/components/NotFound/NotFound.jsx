import React, { useEffect } from 'react';
import './NotFound.css';
import Parallax from 'parallax-js';
import { Link } from 'react-router-dom';
const NotFound = () => {
    useEffect(() => {
        const scene = document.getElementById('scene');
        const parallax = new Parallax(scene);

        return () => {
            parallax.destroy();
        };
    }, []);

    return (
        <div className='NotFound'>
            <section className="wrapper">
                <div className="container">
                    <div id="scene" className="scene" data-hover-only="false">
                        <div className="circle" data-depth="1.2"></div>
                        <div className="one" data-depth="0.9">
                            <div className="content">
                                <span className="piece"></span>
                                <span className="piece"></span>
                                <span className="piece"></span>
                            </div>
                        </div>
                        <div className="two" data-depth="0.60">
                            <div className="content">
                                <span className="piece"></span>
                                <span className="piece"></span>
                                <span className="piece"></span>
                            </div>
                        </div>
                        <div className="three" data-depth="0.40">
                            <div className="content">
                                <span className="piece"></span>
                                <span className="piece"></span>
                                <span className="piece"></span>
                            </div>
                        </div>
                        <p className="p404" data-depth="0.50">404</p>
                        <p className="p404" data-depth="0.10">404</p>
                    </div>

                    <div className="text">
                        <article>
                            <p>Uh oh! YourPage was not found</p>
                            <Link to='/'>
                                <button>Back TO Home</button>

                            </Link>
                        </article>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default NotFound;
