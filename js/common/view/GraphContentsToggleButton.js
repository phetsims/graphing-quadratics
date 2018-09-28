// Copyright 2018, University of Colorado Boulder

/**
 * Button used to show/hide the contents of the graph.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const EyeToggleButton = require( 'SCENERY_PHET/buttons/EyeToggleButton' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const PhetColorScheme = require( 'SCENERY_PHET/PhetColorScheme' );

  class GraphContentsToggleButton extends EyeToggleButton {

    /**
     * @param {BooleanProperty} graphContentsVisibleProperty
     * @param {Object} [options]
     */
    constructor( graphContentsVisibleProperty, options ) {

      super( graphContentsVisibleProperty, options );

      graphContentsVisibleProperty.link( visible => {
        if ( visible ) {
          this.setBaseColor( 'white' );
        }
        else {
          this.setBaseColor( PhetColorScheme.BUTTON_YELLOW );
        }
      } );
    }
  }

  return graphingQuadratics.register( 'GraphContentsToggleButton', GraphContentsToggleButton );
} );