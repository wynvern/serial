import confirmDialog from "./confirmDialog.svelte";
import { mount, unmount } from "svelte";

export function showConfirm({
	title,
	message,
	variant,
}: { title: string; message: string; variant?: "default" | "destructive" }) {
	return new Promise((resolve) => {
		const dialog = mount(confirmDialog, {
			target: document.body,
			props: {
				open: true,
				title,
				variant,
				message,
				onResult: (result: boolean) => {
					unmount(dialog);
					resolve(result);
				},
			},
		});
	});
}
