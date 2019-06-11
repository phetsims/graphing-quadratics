// Copyright 2018, University of Colorado Boulder

/**
 * View-specific Properties for the 'Standard Form' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const BooleanProperty = require( 'AXON/BooleanProperty' );
  const GQViewProperties = require( 'GRAPHING_QUADRATICS/common/view/GQViewProperties' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const Tandem = require( 'TANDEM/Tandem' );

  class StandardFormViewProperties extends GQViewProperties {

    /**
     * @param {Object} [options]
     */
    constructor( options ) {

      options = _.extend( {

        // {boolean} values for optional BooleanProperties
        vertexVisible: false,
        axisOfSymmetryVisible: false,
        coordinatesVisible: true,

        // phet-io
        tandem: Tandem.required
      }, options );

      super( options );

      // @public
      this.rootsVisibleProperty = new BooleanProperty( false, {
        tandem: options.tandem.createTandem( 'rootsVisibleProperty' ),
        phetioDocumentation: 'whether the roots of the quadratic are visible'
      } );
    }

    /**
     * @public
     * @override
     */
    reset() {
      super.reset();
      this.rootsVisibleProperty.reset();
    }
  }

  return graphingQuadratics.register( 'StandardFormViewProperties', StandardFormViewProperties );
} );

 