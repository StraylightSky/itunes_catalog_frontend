import React, { Component } from 'react';
import {
  Grid,
  Typography,
  CircularProgress,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import SearchResult from './SearchResult';
import styles from './styles';

class SearchResultList extends Component {
  shouldComponentUpdate(nextProps, _nextState) {
    const { isFetching, favoritesCount } = this.props;
    if (nextProps.favoritesCount !== favoritesCount) {
      return true;
    }
    if (nextProps.isFetching !== isFetching) {
      return true;
    }
    return false;
  }

  handleClick = (item) => {
    this.props.onFavoriteClick(item);
  }

  render() {
    const { results, isFetching, noResults, classes } = this.props;

    if (isFetching) {
      return <CircularProgress />;
    }

    if (noResults) {
      return <Typography className={classes.marginTop10} variant="h5">No results found.</Typography>
    }

    return(
      <div>
        { results && Object.keys(results).length > 0 &&
          <div>
            {Object.keys(results).map((kind, i, arr) => {
              return(
                <div key={`${kind}-wrapper`}>
                  <Typography variant="h4">
                    {kind}
                  </Typography>
                  <div
                    key={`${kind}-${i}-container`}
                    style={(i === arr.length - 1) ? styles.cardNoMargin : styles.cardMargin}>
                    <Grid container spacing={16}>
                      <Grid item xs={12}>
                        <Grid container justify="center" spacing={24}>
                          {results[kind].map((result, j) => {
                            return(
                              <SearchResult
                                key={`${result}-${j}`}
                                item={result}
                                onClick={this.handleClick}
                              />
                            )
                          })}
                        </Grid>
                      </Grid>
                    </Grid>
                  </div>
                </div>
              );
            })}
          </div>
        }
      </div>
    );
  }
}

export default withStyles(styles)(SearchResultList);
