// Copyright 2018-2025, University of Colorado Boulder

/**
 * ExploreModel is the model for the 'Explore' screen. It extends the 'Standard Form' model by adding curves for
 * the individual terms of the interactive quadratic.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import Quadratic from '../../common/model/Quadratic.js';
import graphingQuadratics from '../../graphingQuadratics.js';
import StandardFormModel from '../../standardform/model/StandardFormModel.js';
import GraphingQuadraticsStrings from '../../GraphingQuadraticsStrings.js';

export default class ExploreModel extends StandardFormModel {

  // Individual terms of the quadratic equation
  public readonly quadraticTermProperty: TReadOnlyProperty<Quadratic>;
  public readonly linearTermProperty: TReadOnlyProperty<Quadratic>;
  public readonly constantTermProperty: TReadOnlyProperty<Quadratic>;

  public constructor( tandem: Tandem ) {

    super( tandem, 'FloatingPoint' /* Coefficients this screen are continuous, set using sliders. */ );

    this.quadraticTermProperty = new DerivedProperty( [ this.quadraticProperty ],
      quadratic => quadratic.getQuadraticTerm(), {
        tandem: tandem.createTandem( 'quadraticTermProperty' ),
        phetioDocumentation: 'the quadratic term (y = ax^2) of the interactive quadratic',
        phetioValueType: Quadratic.QuadraticIO
      } );

    this.linearTermProperty = new DerivedProperty( [ this.quadraticProperty ],
      quadratic => quadratic.getLinearTerm(), {
        tandem: tandem.createTandem( 'linearTermProperty' ),
        phetioDocumentation: 'the linear term (y = bx) of the interactive quadratic',
        phetioValueType: Quadratic.QuadraticIO
      } );

    this.constantTermProperty = new DerivedProperty( [ this.quadraticProperty ],
      quadratic => quadratic.getConstantTerm(), {
        tandem: tandem.createTandem( 'constantTermProperty' ),
        phetioDocumentation: 'the constant term (y = c) of the interactive quadratic',
        phetioValueType: Quadratic.QuadraticIO
      } );
  }

  /**
   * Gets the name of a quadratic, as it appears in interactive descriptions.
   */
  public override getCurveName( quadratic: Quadratic ): string | null {

    // Compare to primary and saved quadratic first.
    let curveName = super.getCurveName( quadratic );

    // Compare to the individual terms.
    if ( curveName === null ) {
      if ( quadratic === this.quadraticTermProperty.value ) {
        curveName = GraphingQuadraticsStrings.a11y.quadraticTermStringProperty.value;
      }
      else if ( quadratic === this.linearTermProperty.value ) {
        curveName = GraphingQuadraticsStrings.a11y.linearTermStringProperty.value;
      }
      else if ( quadratic === this.constantTermProperty.value ) {
        curveName = GraphingQuadraticsStrings.a11y.constantTermStringProperty.value;
      }
    }

    return curveName;
  }
}

graphingQuadratics.register( 'ExploreModel', ExploreModel );