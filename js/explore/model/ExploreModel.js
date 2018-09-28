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
  const DerivedPropertyIO = require( 'AXON/DerivedPropertyIO' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const QuadraticIO = require( 'GRAPHING_QUADRATICS/common/model/QuadraticIO' );
  const StandardFormModel = require( 'GRAPHING_QUADRATICS/standardform/model/StandardFormModel' );

  class ExploreModel extends StandardFormModel {

    /**
     * @param {Tandem} tandem
     */
    constructor( tandem ) {

      super( tandem );

      // @public (read-only)
      this.quadraticTermProperty = new DerivedProperty( [ this.quadraticProperty ],
        quadratic => { return quadratic.getQuadraticTerm(); }, {
          tandem: tandem.createTandem( 'quadraticTermProperty' ),
          phetioType: DerivedPropertyIO( QuadraticIO ),
          phetioInstanceDocumentation: 'the quadratic term, y = ax^2, of the interactive quadratic'
        } );

      // @public (read-only)
      this.linearTermProperty = new DerivedProperty( [ this.quadraticProperty ],
        quadratic => { return quadratic.getLinearTerm(); }, {
          tandem: tandem.createTandem( 'linearTermProperty' ),
          phetioType: DerivedPropertyIO( QuadraticIO ),
          phetioInstanceDocumentation: 'the linear term, y = bx, of the interactive quadratic'
        } );

      // @public (read-only)
      this.constantTermProperty = new DerivedProperty( [ this.quadraticProperty ],
        quadratic => { return quadratic.getConstantTerm(); }, {
          tandem: tandem.createTandem( 'constantTermProperty' ),
          phetioType: DerivedPropertyIO( QuadraticIO ),
          phetioInstanceDocumentation: 'the constant term, y = c, of the interactive quadratic'
        } );
    }
  }

  return graphingQuadratics.register( 'ExploreModel', ExploreModel );
} );
