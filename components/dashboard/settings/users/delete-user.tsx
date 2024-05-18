import React from "react";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { api } from "@/utils/api";
import { TrashIcon } from "lucide-react";
import { toast } from "sonner";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

interface Props {
	authId: string;
}
export const DeleteUser = ({ authId }: Props) => {
	const { mutateAsync, isLoading } = api.admin.removeUser.useMutation();
	const utils = api.useUtils();
	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<DropdownMenuItem
					className="w-full cursor-pointer"
					onSelect={(e) => e.preventDefault()}
				>
					Delete User
				</DropdownMenuItem>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
					<AlertDialogDescription>
						This action cannot be undone. This will permanently delete the user.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction
						onClick={async () => {
							await mutateAsync({
								authId,
							})
								.then(async () => {
									utils.user.all.invalidate();
									toast.success("User delete succesfully");
								})
								.catch(() => {
									toast.error("Error to delete the user");
								});
						}}
					>
						Confirm
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};
