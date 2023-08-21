export const parseRequestUrl = () => {
    const address = document.location.hash.slice(1).split('?')[0];
    const queryString =
         document.location.hash.slice(1).split('?').length === 2
            ? document.location.hash.slice(1).split('?')[1]
            : '';
  
    const url = address.toLowerCase() || '/';
    const r = url.split('/');
    const q = queryString.split('=');
    return {
        resource: r[1],
        id: r[2],
        verb: r[3],
        name: q[0],
        value: q[1],
    };
};

export const rerender = async (component) => {
    document.getElementById('main-container').innerHTML = await component.render();
    await component.after_render();
}

export const showMessage = (message) => {
    document.getElementById('message-overlay').innerHTML = `
        <div>
            <div id="message-overlay-content">${message}</div>
            <button id="message-overlay-button">OK</button>
        </div>
    `;
    document.getElementById('message-overlay').classList.add('active');
    document.getElementById('message-overlay-button').addEventListener('click', () => {
        document.getElementById('message-overlay').classList.remove('active');
    });
}