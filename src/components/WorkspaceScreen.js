import { useContext, useState } from "react";
import Top5Item from "./Top5Item.js";
import List from "@mui/material/List";
import { Typography } from "@mui/material";
import { GlobalStoreContext } from "../store/index.js";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

import ErrorModal from "./ErrorModal";
/*
    This React component lets us edit a loaded list, which only
    happens when we are on the proper route.
    
    @author McKilla Gorilla
*/
function WorkspaceScreen(props) {
	const { store } = useContext(GlobalStoreContext);
	const [list, setList] = useState(
		store.currentList !== null ? { ...store.currentList } : {}
	);
	const [disableSave, setDisableSave] = useState(false);
	const [disablePublish, setDisablePublish] = useState(
		list.items.some((item) => item.trim().length === 0) ||
			list.name.trim().length === 0 ||
			new Set(list.items.map((item) => item.trim().toLowerCase()))
				.size !== 5
	);
	const editList = (index, value) => {
		list.items[index] = value.trim();
		console.log(list.name);
		console.log(list.items);

		if (
			list.items.some((item) => item.trim().length === 0) ||
			list.name.trim().length === 0 ||
			new Set(list.items.map((item) => item.trim().toLowerCase()))
				.size !== 5 ||
			store.idNamePairs
				.filter((item) => item.published === true)
				.map((e) => e.name.toLowerCase())
				.includes(list.name.trim().toLowerCase())
		) {
			setDisablePublish(true);
		} else if (
			list.items.every((item) => item.trim().length !== 0) &&
			list.name.trim().length !== 0 &&
			new Set(list.items.map((item) => item.trim().toLowerCase()))
				.size === 5 &&
			!store.idNamePairs
				.filter((item) => item.published === true)
				.map((e) => e.name.toLowerCase())
				.includes(list.name.trim().toLowerCase())
		) {
			setDisablePublish(false);
		}
	};

	const handleListNameChange = (event) => {
		list.name = event.target.value.trim();
		console.log(event.target.value);
		console.log(list.items);
		if (list.name.trim().length === 0) setDisableSave(true);
		else setDisableSave(false);
		console.log(
			store.idNamePairs
				.filter((item) => item.published === true)
				.map((e) => e.name.toLowerCase())
		);
		if (
			list.items.some((item) => item.trim().length === 0) ||
			list.name.trim().length === 0 ||
			new Set(list.items.map((item) => item.trim().toLowerCase()))
				.size !== 5 ||
			store.idNamePairs
				.filter((item) => item.published === true)
				.map((e) => e.name.toLowerCase())
				.includes(list.name.trim().toLowerCase())
		) {
			setDisablePublish(true);
		} else if (
			list.items.every((item) => item.trim().length !== 0) &&
			list.name.trim().length !== 0 &&
			new Set(list.items.map((item) => item.trim().toLowerCase()))
				.size === 5 &&
			!store.idNamePairs
				.filter((item) => item.published === true)
				.map((e) => e.name.toLowerCase())
				.includes(list.name.trim().toLowerCase())
		) {
			setDisablePublish(false);
		}
	};

	const handleSave = () => {
		console.log(list.name);
		console.log(list.items);
		store.updateList(list.name, list.items);
	};

	const handlePublish = () => {
		store.publishList(list.name, list.items);
	};

	let editItems = "";
	if (store.currentList) {
		editItems = (
			<List
				id="edit-items"
				sx={{
					width: "100%",
					bgcolor: "background.paper",
					paddingTop: 0,
					paddingBottom: 0,
				}}
			>
				{list.items.map((item, index) => (
					<Top5Item
						key={"top5-item-" + (index + 1)}
						id={"top5-item-" + (index + 1)}
						text={item}
						index={index}
						edit={editList}
					/>
				))}
			</List>
		);
	}
	return (
		<div id="top5-workspace">
			<TextField
				variant="standard"
				sx={{
					margin: "1% 20px",
					width: "50%",
					border: "0px",
					height: "8%",
				}}
				inputProps={{
					sx: {
						padding: "5px",
						bgcolor: "white",
					},
				}}
				defaultValue={list.name}
				onChange={handleListNameChange}
			/>
			<div id="workspace-edit">
				<div id="edit-numbering">
					<div className="item-number">
						<Typography variant="h3">1.</Typography>
					</div>
					<div className="item-number">
						<Typography variant="h3">2.</Typography>
					</div>
					<div className="item-number">
						<Typography variant="h3">3.</Typography>
					</div>
					<div className="item-number">
						<Typography variant="h3">4.</Typography>
					</div>
					<div className="item-number">
						<Typography variant="h3">5.</Typography>
					</div>
				</div>
				{editItems}
			</div>
			<div id="workspace-control">
				<Box
					sx={{
						display: "flex",
						position: "absolute",
						right: "20px",
						alignItems: "center",
						height: "100%",
					}}
				>
					<Button
						variant="contained"
						sx={{
							width: "100px",
							bgcolor: "#e6e6e6",
							fontWeight: 600,
							marginRight: "10px",
						}}
						onClick={handleSave}
						disabled={disableSave === true ? true : false}
					>
						Save
					</Button>
					<Button
						variant="contained"
						sx={{
							width: "100px",
							bgcolor: "#e6e6e6",
							fontWeight: 600,
						}}
						onClick={handlePublish}
						disabled={disablePublish}
					>
						Publish
					</Button>
				</Box>
			</div>
		</div>
	);
}

export default WorkspaceScreen;
