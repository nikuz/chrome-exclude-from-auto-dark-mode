import { render } from 'solid-js/web';
import { createSignal, onMount } from 'solid-js';
import { Toggle } from './components';
import {
    getCurrentTabUrl,
    isDarkModeDisabled,
    storageGet,
    storageSet,
} from 'utils';

const MAX_PATHNAME_LENGTH = 30;

function Popup() {
    const [host, setHost] = createSignal('');
    const [hostEnabled, setHostEnabled] = createSignal(true);
    const [path, setPath] = createSignal('');
    const [hostWithPath, setHostWithPath] = createSignal('');
    const [hostWithPathEnabled, setHostWithPathEnabled] = createSignal(true);

    const hostChangeHandler = async (event: Event) => {
        const target = event.target as HTMLInputElement;
        let checked = target.checked;

        setHostEnabled(checked);
        storageSet(host(), checked);

        if (path() !== '/') {
            const hostWithPath = `${host()}${path()}`;
            const hostPathStoreData = await storageGet(hostWithPath);
            if (hostPathStoreData === undefined) {
                setHostWithPathEnabled(checked);
            }
        }
    }

    const hostWithPathChangeHandler = async (event: Event) => {
        const target = event.target as HTMLInputElement;
        const checked = target.checked;

        setHostWithPathEnabled(checked);
        storageSet(`${host()}${path()}`, checked);
    }

    onMount(async () => {
        const tabUrl = await getCurrentTabUrl();
        if (!tabUrl) {
            return;
        }

        const host = tabUrl.host;
        const path = tabUrl.pathname;

        setHost(host);
        setPath(path);
        setHostEnabled(!await isDarkModeDisabled(host));

        if (path !== '/') {
            let pathSubstring = path;

            if (path.length > MAX_PATHNAME_LENGTH) {
                pathSubstring = path.substring(0, MAX_PATHNAME_LENGTH) + '...';
            }
            setHostWithPath(`${host}${pathSubstring}`);
            setHostWithPathEnabled(!await isDarkModeDisabled(`${host}${path}`));
        }
    });

    return (
        <div class="container">
            <h3 class="title">Enable Auto Dark Mode</h3>

            <Toggle
                label={host()}
                checked={hostEnabled()}
                onChange={hostChangeHandler}
            />

            {path() !== '/' && (
                <Toggle
                    label={hostWithPath()}
                    checked={hostWithPathEnabled()}
                    onChange={hostWithPathChangeHandler}
                />
            )}
        </div>
    );
}

const root = document.getElementById('root');

render(() => <Popup />, root!)