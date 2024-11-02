import { render } from 'solid-js/web';
import { createSignal, onMount } from 'solid-js';
import {
    setIcon,
    getCurrentTabUrl,
    isDarkModeEnabled,
    storageSet,
} from 'utils';

const MAX_PATHNAME_LENGTH = 30;

function Popup() {
    const [host, setHost] = createSignal('');
    const [hostEnabled, setHostEnabled] = createSignal(true);
    const [hostWithPath, setHostWithPath] = createSignal('');
    const [hostWithPathEnabled, setHostWithPathEnabled] = createSignal(true);

    const hostChangeHandler = async (event: Event) => {
        const tabUrl = await getCurrentTabUrl();
        if (!tabUrl) {
            return;
        }

        const target = event.target as HTMLInputElement;
        const checked = target.checked;
        setHostEnabled(checked);
        storageSet(tabUrl.host, checked);

        setHostWithPathEnabled(checked);
        storageSet(`${tabUrl.host}${tabUrl.pathname}`, checked);

        setIcon(checked ? 'moon' : 'sun');
    }

    const hostWithPathChangeHandler = async (event: Event) => {
        const tabUrl = await getCurrentTabUrl();
        if (!tabUrl) {
            return;
        }

        const target = event.target as HTMLInputElement;
        const checked = target.checked;
        setHostWithPathEnabled(checked);
        storageSet(`${tabUrl.host}${tabUrl.pathname}`, checked);

        setIcon(checked ? 'moon' : 'sun');
    }

    onMount(async () => {
        const tabUrl = await getCurrentTabUrl();
        if (!tabUrl) {
            return;
        }

        setHost(tabUrl.host);
        setHostEnabled(await isDarkModeEnabled(tabUrl.host));

        if (tabUrl.pathname !== '/') {
            let pathname = tabUrl.pathname;
            if (pathname.length > MAX_PATHNAME_LENGTH) {
                pathname = pathname.substring(0, MAX_PATHNAME_LENGTH) + '...';
            }
            const hostWithPath = `${tabUrl.host}${pathname}`;
            setHostWithPath(hostWithPath);
            setHostWithPathEnabled(await isDarkModeEnabled(`${tabUrl.host}${tabUrl.pathname}`));
        }
    });

    return (
        <div class="container">
            <h3 class="title">Enable Auto Dark Mode</h3>

            <div class="row">
                <label class="label" for="dark_mode_host">
                    {host()}
                </label>
                <label class="switch">
                    <input
                        type="checkbox"
                        id="dark_mode_host"
                        checked={hostEnabled()}
                        onChange={hostChangeHandler}
                    />
                    <span class="slider" />
                </label>
            </div>

            {hostWithPath() !== '' && (
                <div class="row">
                    <label class="label" for="dark_mode_host_with_path">
                        {hostWithPath()}
                    </label>
                    <label class="switch">
                        <input
                            type="checkbox"
                            id="dark_mode_host_with_path"
                            checked={hostWithPathEnabled()}
                            onChange={hostWithPathChangeHandler}
                        />
                        <span class="slider" />
                    </label>
                </div>
            )}
        </div>
    );
}

const root = document.getElementById('root');

render(() => <Popup />, root!)