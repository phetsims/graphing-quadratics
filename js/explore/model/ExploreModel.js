// Copyright 2018, University of Colorado Boulder

/**
 * Model for the 'Explore' screen.  Extends the 'Standard Form' model by adding curves for
 * the individual terms of the interactive quadratic.
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

      super( tandem, {
        numberType: 'FloatingPoint' // NumberProperty coefficients values in this screen
      } );

      // @public {DerivedProperty.<Quadratic>}
      this.quadraticTermProperty = new DerivedProperty( [ this.quadraticProperty ],
        quadratic => quadratic.getQuadraticTerm(), {
          tandem: tandem.createTandem( 'quadraticTermProperty' ),
          phetioType: DerivedPropertyIO( QuadraticIO ),
          phetioDocumentation: 'the quadratic term (y = ax^2) of the interactive quadratic'
        } );

      // @public {DerivedProperty.<Quadratic>}
      this.linearTermProperty = new DerivedProperty( [ this.quadraticProperty ],
        quadratic => quadratic.getLinearTerm(), {
          tandem: tandem.createTandem( 'linearTermProperty' ),
          phetioType: DerivedPropertyIO( QuadraticIO ),
          phetioDocumentation: 'the linear term (y = bx) of the interactive quadratic'
        } );

      // @public {DerivedProperty.<Quadratic>}
      this.constantTermProperty = new DerivedProperty( [ this.quadraticProperty ],
        quadratic => quadratic.getConstantTerm(), {
          tandem: tandem.createTandem( 'constantTermProperty' ),
          phetioType: DerivedPropertyIO( QuadraticIO ),
          phetioDocumentation: 'the constant term (y = c) of the interactive quadratic'
        } );
    }
  }

  return graphingQuadratics.register( 'ExploreModel', ExploreModel );
} );
