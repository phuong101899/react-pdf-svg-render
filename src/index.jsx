import React, {useEffect, useRef} from 'react';
import PDFJS from 'pdfjs-dist/webpack';
import 'pdfjs-dist/web/pdf_viewer.css';
import * as _ from 'lodash';

function Index({url}) {
    const root = useRef(null);
    useEffect(() => {
        render();

        window.addEventListener('resize', resizeRender);

    }, []);

    const render = async () => {
        let pdf = await PDFJS.getDocument(url).promise;
        // Get div#container and cache it for later use
        let container = root.current;
        if(!container) return;

        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }
        let containerWith = container.clientWidth;

        // Loop from 1 to total_number_of_pages in PDF document
        for (let i = 1; i <= pdf.numPages; i++) {

            // Get desired page
            let page = await pdf.getPage(i);

            let viewport = page.getViewport({scale: 1});
            let scale = containerWith/viewport.width;
            viewport = page.getViewport({scale});

            container.style.maxWidth = '100%';
            container.style.background = '#ccc';

            page.getOperatorList()
                .then(function (opList) {
                    let svgGfx = new PDFJS.SVGGraphics(page.commonObjs, page.objs);
                    return svgGfx.getSVG(opList, {
                        ...viewport
                    });
                })
                .then(function (svg) {
                    svg.style.background = '#fff';
                    container.appendChild(svg);
                });

        }
    };
    const resizeRender = _.debounce(render, 500);

    return (
        <div id="container" ref={root} />
    );
}

export default Index;
