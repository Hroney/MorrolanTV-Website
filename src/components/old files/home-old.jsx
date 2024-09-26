import React from 'react';
import { Scroller } from './promo/scroller';
import "./home.css"

export class Home extends React.Component {
    #embed = null;
    createTwitchEmbed = () => {
        if (window.Twitch && !this.#embed) {
            this.#embed = new window.Twitch.Embed("twitch-embed", {
                width: "100%",
                height: "95%",
                channel: "morrolantv",
                layout: "chat",
            });
        }
    };
    componentDidMount = () => this.createTwitchEmbed()
    render = () => <section id="twitch-embed" >
        <Scroller />
    </section>
}
