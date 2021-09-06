import React, { useEffect, useState } from "react";

//include images into your bundle
//import rigoImage from "../../img/rigo-baby.jpg";

//create your first component

export const Home = () => {
	const [Lista, setLista] = useState([]);
	const THEurl = "https://assets.breatheco.de/apis/sound/";
	const [nowPlay, setNowPlay] = useState("");
	const [temporalIndex, setTemporalIndex] = useState(-1);
	const AUDIO_TAG = document.querySelector("audio");

	useEffect(() => {
		fetch("https://assets.breatheco.de/apis/sound/songs")
			.then(response => {
				if (response.ok) {
					return response.json();
				}
				throw Error(response.statusText);
			})
			.then(dataAsJson => {
				setLista(dataAsJson);
			})
			.catch(error => {
				"Looks like there was a problem!", error;
			});
	}, []);

	const ListaMap = Lista.map((song, index) => {
		return (
			<li
				key={song.url}
				onClick={() => {
					let newurl = THEurl.concat(song.url);
					setNowPlay(newurl);
					setTemporalIndex(index);
				}}>
				{song.name}
			</li>
		);
	});

	function playAudio() {
		AUDIO_TAG.play();
	}

	function pauseAudio() {
		AUDIO_TAG.pause();
	}

	function previousSong(songIndex) {
		// let newurl = THEurl.concat(songList[songIndex - 1].url);
		// setNowPlay(newurl);
		// setTemporalIndex(songIndex - 1);
		let newurl = "";
		if (Lista[songIndex - 1]) {
			//if this exists
			newurl = THEurl.concat(Lista[songIndex - 1].url);
			setNowPlay(newurl);
			setTemporalIndex(songIndex - 1);
		} else {
			//no exists (songList[-1])
			newurl = THEurl.concat(Lista[Lista.length - 1].url);
			setNowPlay(newurl);
			setTemporalIndex(Lista.length - 1);
		}
	}
	function nextSong(songIndex) {
		// let newurl = THEurl.concat(songList[songIndex + 1].url);
		// setNowPlay(newurl);
		// setTemporalIndex(songIndex + 1);
		let newurl = "";
		if (Lista[songIndex + 1]) {
			//if this exists
			newurl = THEurl.concat(Lista[songIndex + 1].url);
			setNowPlay(newurl);
			setTemporalIndex(songIndex + 1);
		} else {
			//no exists (songList[+1 de lenght])
			newurl = THEurl.concat(Lista[0].url);
			setNowPlay(newurl);
			setTemporalIndex(0);
		}
	}
	return (
		<div className="container">
			<ol className="ListCanciones">{ListaMap}</ol>
			<audio src={nowPlay} autoPlay />
			<footer>
				<button onClick={() => previousSong(temporalIndex)}>
					<i className="fas fa-backward"></i>
				</button>
				<button onClick={playAudio}>
					<i className="fas fa-play"></i>
				</button>
				<button onClick={pauseAudio}>
					<i className="fas fa-pause"></i>
				</button>
				<button onClick={() => nextSong(temporalIndex)}>
					{<i className="fas fa-forward"></i>}
				</button>
			</footer>
		</div>
	);
};

export default Home;
