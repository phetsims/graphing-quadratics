// Copyright 2018, University of Colorado Boulder

/**
 * Model for the 'Explore' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const DerivedProperty = require( 'AXON/DerivedProperty' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const StandardFormModel = require( 'GRAPHING_QUADRATICS/standardform/model/StandardFormModel' );

  class ExploreModel extends StandardFormModel {

    /**
     * @param {Object} [options]
     */
    constructor( options ) {

      super( options );

      // @public (read-only) y = ax^2
      this.quadraticTermProperty = new DerivedProperty( [ this.quadraticProperty ],
        quadratic => { return quadratic.getQuadraticTerm(); } );
      
      // @public (read-only) y = bx
      this.linearTermProperty = new DerivedProperty( [ this.quadraticProperty ],
        quadratic => { return quadratic.getLinearTerm(); } );

      // @public (read-only) y = c
      this.constantTermProperty = new DerivedProperty( [ this.quadraticProperty ],
        quadratic => { return quadratic.getConstantTerm(); } );
    }
  }

  return graphingQuadratics.register( 'ExploreModel', ExploreModel );
} );
