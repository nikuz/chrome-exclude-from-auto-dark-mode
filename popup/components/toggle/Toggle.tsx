import './popup.css';

interface Props {
    label: string,
    checked: boolean,
    onChange: (event: Event) => void,
}

export function Toggle(props: Props) {
    return (
        <div class="toggle-container">
            <label class="label" for="dark_mode_host_with_path">
                {props.label}
            </label>
            <label class="switch">
                <input
                    type="checkbox"
                    id="dark_mode_host_with_path"
                    checked={props.checked}
                    onChange={props.onChange}
                />
                <span class="slider" />
            </label>
        </div>
    )
}