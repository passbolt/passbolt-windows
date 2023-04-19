/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         0.0.1
 */

/**
 * Represents a React component that serves as an app.
 * @class
 * @extends React.Component
 */
class App extends React.Component {

    /**
     * Creates an instance of the App component.
     * @param {Object} props - The props passed to the component.
     */
    constructor(props) {
        super(props);
    }

    /**
     * Adds event listeners for the "from-main" event from the main process.
     */
    componentDidMount() {
        this.onEvents();
    } 

    /**
     * Defines the event handler for "from-main" event from the main process.
     * @method
     */
    onEvents() {
        window.chrome.webview.addEventListener('message', () => {
            switch (ipc.topic) {
                case 'initialization':
                    window.chrome.webview.postMsessage(JSON.stringify({ topic: 'initialization'}));                    
                    break;
            }
        })
    }
}

export default App;
