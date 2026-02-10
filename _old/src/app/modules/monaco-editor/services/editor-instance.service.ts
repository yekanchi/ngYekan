import {EditorComponent} from "../editor.component";


export interface EditorInstanceService {
	setDefaults(component: EditorComponent): void;

	dispose(): void;
}

