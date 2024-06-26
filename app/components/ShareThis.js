"use client";
import React from "react";
import { StickyShareButtons } from "sharethis-reactjs";

const ShareThis = ({ image, description, title }) => {
  return (
    <div>
      <style
        dangerouslySetInnerHTML={{
          __html: `
          html, body {
            margin: 0;
            padding: 0;
            text-align: center;
          }
          h1 {
            font-size: 24px;
            font-weight: bold;
          }
          hr {
            margin-bottom: 40px;
            margin-top: 40px;
            width: 50%;
          }
        `,
        }}
      />

      <StickyShareButtons
        config={{
          alignment: "left", // alignment of buttons (left, right)
          color: "social", // set the color of buttons (social, white)
          enabled: true, // show/hide buttons (true, false)
          font_size: 16, // font size for the buttons
          hide_desktop: false, // hide buttons on desktop (true, false)
          labels: "counts", // button labels (cta, counts, null)
          language: "en", // which language to use (see LANGUAGES)
          min_count: 0, // hide react counts less than min_count (INTEGER)
          networks: [
            // which networks to include (see SHARING NETWORKS)
            "facebook",
            "twitter",
            "pinterest",
            "skype",
            "whatsapp",
          ],
          padding: 12, // padding within buttons (INTEGER)
          radius: 4, // the corner radius on each button (INTEGER)
          show_total: true, // show/hide the total share count (true, false)
          show_mobile: true, // show/hide the buttons on mobile (true, false)
          show_toggle: true, // show/hide the toggle buttons (true, false)
          size: 45, // the size of each button (INTEGER)
          top: 160, // offset in pixels from the top of the page

          // OPTIONAL PARAMETERS
          //   url: "https://www.sharethis.com", // (defaults to current url)
          image: `${image}`, // (defaults to og:image or twitter:image)
          description: `${description}`, // (defaults to og:description or twitter:description)
          title: `${title}`, // (defaults to og:title or twitter:title)
          message: "custom email text", // (only for email sharing)
          subject: "custom email subject", // (only for email sharing)
          username: "custom twitter handle", // (only for twitter sharing)
        }}
      />
    </div>
  );
};

export default ShareThis;
