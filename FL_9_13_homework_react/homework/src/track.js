import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Track extends Component {
  constructor(props) {
    super(props);

    this.handleLike = this.handleLike.bind(this);
    this.handlePlay = this.handlePlay.bind(this);
  }

  handlePlay() {
    const isPlaying = this.props.song.id === (this.props.currentSong && this.props.currentSong.id) && !this.props.paused;
    if (isPlaying) {
      this.props.handlePause(this.props.song)
    } else {
      this.props.handlePlay(this.props.song);
    }
  }

  handleLike() {
    this.props.handleLike(this.props.song);
  }

  render() {
    const liked = this.props.song.liked ? 'liked' : '';
    const likeClasses = `material-icons ${liked}`;
    const isPlaying = this.props.song.id === (this.props.currentSong && this.props.currentSong.id) && !this.props.paused;
    return (
      <div className="track-item">
        <i onClick={this.handlePlay} className="material-icons">{ isPlaying ? 'pause' : 'play_arrow' }</i>
        <div className="description">
          <span className="description-title">{ this.props.song.title }</span>
          <span className="description-author">{ this.props.song.author }</span>
        </div>
        <button
          type="button"
          onClick={this.handleLike}
          className={likeClasses}>{ this.props.song.liked ? 'favorite' : 'favorite_border'}
        </button>
      </div>
    );
  }
}

Track.propTypes = {
  song: PropTypes.object.isRequired,
  currentSong: PropTypes.object,
  paused: PropTypes.bool.isRequired,
  handleLike: PropTypes.func.isRequired,
  handlePlay: PropTypes.func.isRequired,
  handlePause: PropTypes.func.isRequired,
};

export { Track };
