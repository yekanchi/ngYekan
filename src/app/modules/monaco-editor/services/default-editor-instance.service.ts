import {EditorComponent} from "../editor.component";
import {EditorInstanceService} from "./editor-instance.service";
import {MonacoService} from "../monaco.service";

export class DefaultEditorInstanceService implements EditorInstanceService {

	constructor(private monacoService: MonacoService) {
	}

	setDefaults(component: EditorComponent) {
	}

	dispose(): void {

	}
}