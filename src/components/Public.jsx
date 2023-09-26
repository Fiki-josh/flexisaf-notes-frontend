import React from 'react'
import { Link } from 'react-router-dom'
export const Public = () => {
    const content = (
        <section className="public">
            <header>
                <h1>Welcome to <span className="nowrap">Flexisaf, Fiki-Notes</span></h1>
            </header>
            <main className="public__main">
                <p>Located in  Garki 2, Abuja, Nigeria, Flexisaf  provides a trained staff ready to meet all your tech needs.</p>
                <address className="public__addr">
                No. 3 Egbedi Close<br />
                off Samuel Ladoke Akintola Boulevard<br />
                Garki 2,Abuja, Nigeria<br />
                    <a href="tel:+2347059887123">07059887123</a>
                </address>
                <br />
                <p>Owner: Fiki</p>
            </main>
            <footer>
                <Link to="/login">Employee Login</Link>
            </footer>
        </section>

    )
    return content
}
