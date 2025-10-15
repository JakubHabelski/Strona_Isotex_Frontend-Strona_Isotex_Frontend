import React, { useState, useEffect } from "react";
import { Blurhash } from "react-blurhash";
import { Card } from "react-bootstrap";

export default function ImageComponent({ src, blurhash, width, height }) {
    const [imageLoaded, setImageLoaded] = useState(false);

    useEffect(() => {
        setImageLoaded(false); // resetuj stan przy zmianie src
        const img = new window.Image();
        img.onload = () => setImageLoaded(true);
        img.onerror = () => setImageLoaded(true); // nawet jak błąd, nie pokazuj hash w nieskończoność
        img.src = src;
    }, [src]);

    return (
        <>
            {!imageLoaded && (
                <Blurhash
                    hash={blurhash}
                    width={width}
                    height={height}
                    resolutionX={32}
                    resolutionY={32}
                    punch={1}
                    style={{ zIndex: 20 }}
                />
            )}
            <Card.Img
                src={src}
                className="img-fluid"
                style={{
                    maxWidth: width,
                    height: height,
                    objectFit: 'cover',
                    display: imageLoaded ? "block" : "none"
                }}
                alt=""
            />
        </>
    );
}