import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Track } from './track';


class Playlist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      songs: [],
      isLoading: false,
    };
    this.updateData = this.updateData.bind(this);
  }

  updateData(value) {
    this.props.getTrack(value);
  }

  renderPlaylist() {
    return (
      <div className="playlist">
        <ul className="track-items">
          { this.props.songs.map(track => (
            <li key={track.id}>
              <Track
                song={track}
                currentSong={this.props.currentSong}
                updateData={this.updateData}
                paused={this.props.paused}
                handleLike={this.props.handleLike}
                handlePlay={this.props.handlePlay}
                handlePause={this.props.handlePause}
              />
            </li>
          )) }
        </ul>
      </div>
    );
  }

  render() {
    return this.renderPlaylist();
  }
}

Playlist.propTypes = {
  songs: PropTypes.array.isRequired,
  currentSong: PropTypes.object,
  paused: PropTypes.bool.isRequired,
  handleLike: PropTypes.func.isRequired,
  handlePlay: PropTypes.func.isRequired,
  handlePause: PropTypes.func.isRequired,
};

export { Playlist };
