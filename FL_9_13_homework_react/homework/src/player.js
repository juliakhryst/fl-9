import React, { Component } from 'react';

import { Playlist } from './playlist';
import { Filter } from './filter';

class Player extends Component {
  constructor(props) {
    super(props);

    this.state = {
      songs: [],
      paused: true,
      currentSong: null,
      currentFilter: 'all',
      isLoading: false,
    };
    this.getTrack = this.getTrack.bind(this);
    this.handleLike = this.handleLike.bind(this);
    this.handlePlay = this.handlePlay.bind(this);
    this.handlePause = this.handlePause.bind(this);
    this.togglePlay = this.togglePlay.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
    this.filterCallback = this.filterCallback.bind(this);
    this.audioRef = React.createRef();
  }

  componentDidMount() {
    this.getSongs();
  }

  getSongs() {
    const url = 'https://fl-homework-api.firebaseio.com/mozart.json';

    this.setState({
      isLoading: true,
    });

    fetch(url)
      .then(res => res.json())
      .then((data) => {
        this.setState({
          songs: data,
          isLoading: false,
        });
      })
      .catch(() => {
        this.setState({
          isLoading: false,
        });
      });
  }

  getTrack(value) {
    this.setState({
      currentSong: value.props,
    });
  }

  handleLike(likedTrack) {
    this.setState(prevState => ({
      songs: prevState.songs.map((track) => {
        if (likedTrack.id === track.id) {
          return {
            ...track,
            liked: !track.liked,
          };
        }

        return track;
      }),
    }));
  }

  handlePlay(currentSong) {
    this.setState({
      paused: false,
      currentSong,
    });

    if (this.state.currentSong) {
      this.audioRef.current.play();
    }
  }

  handlePause() {
    this.setState({ paused: true });
    this.audioRef.current.pause();
  }

  togglePlay() {
    if (this.state.paused) {
      this.handlePlay(this.state.currentSong);
    } else {
      this.handlePause();
    }
  }

  handleFilter(currentFilter) {
    this.setState({ currentFilter });
  }

  filterCallback(song) {
    if (this.state.currentFilter === 'favorite') {
      return song.liked;
    }

    return true;
  }

  render() {
    const posterDefaultUrl = 'https://rmp.files.bbci.co.uk/music-web/2.1.0.336/img/tracks/default-track.png';
    if (this.state.isLoading) {
      return (
        <p className="error-message">Loading music...</p>
      );
    }
    return (
      <div className="container">
        <div className="preview-wrapper">
          <h2>Now playing</h2>
          {this.state.currentSong && (
            <div className="preview">
              <audio src={this.state.currentSong.mp3} ref={this.audioRef} />
              <div className="info">
                <img
                  src={this.state.currentSong.poster}
                  alt="Song cover"
                  onError={(e) => { e.target.onerror = null; e.target.src = posterDefaultUrl; }}
                />
                <div className="author">{ this.state.currentSong.author }</div>
                <div className="name">{ this.state.currentSong.title }</div>
              </div>
              <div className="controls">
                <div className="progress">
                  <div className="progress-line" />
                </div>
                <div className="btn-wrapper">
                  <i className="material-icons stop" onClick={this.togglePlay}>
                    {this.state.paused ? 'play_arrow' : 'pause' }
                  </i>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="playlist-wrapper">
          <h2>Playlist</h2>
          <Filter
            handleFilter={this.handleFilter}
            currentFilter={this.state.currentFilter}
          />
          <Playlist
            songs={this.state.songs.filter(this.filterCallback)}
            paused={this.state.paused}
            currentSong={this.state.currentSong}
            handleLike={this.handleLike}
            handlePlay={this.handlePlay}
            handlePause={this.handlePause}
          />
        </div>
      </div>
    );
  }
}


export { Player };
