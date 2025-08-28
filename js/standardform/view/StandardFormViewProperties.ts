// Copyright 2018-2025, University of Colorado Boulder

/**
 * View-specific Properties for the 'Standard Form' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import Property from '../../../../axon/js/Property.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import GQViewProperties from '../../common/view/GQViewProperties.js';
import graphingQuadratics from '../../graphingQuadratics.js';

export default class StandardFormViewProperties extends GQViewProperties {

  public readonly vertexVisibleProperty: Property<boolean>;
  public readonly axisOfSymmetryVisibleProperty: Property<boolean>;
  public readonly rootsVisibleProperty: Property<boolean>;
  public readonly coordinatesVisibleProperty: Property<boolean>;

  public constructor( tandem: Tandem ) {

    super( {
      tandem: tandem
    } );

    this.vertexVisibleProperty = new BooleanProperty( false, {
      tandem: tandem.createTandem( 'vertexVisibleProperty' ),
      phetioFeatured: true,
      phetioDocumentation: 'whether the vertex point or manipulator is visible'
    } );

    this.axisOfSymmetryVisibleProperty = new BooleanProperty( false, {
      tandem: tandem.createTandem( 'axisOfSymmetryVisibleProperty' ),
      phetioFeatured: true,
      phetioDocumentation: 'whether the axis of symmetry is visible'
    } );

    this.rootsVisibleProperty = new BooleanProperty( false, {
      tandem: tandem.createTandem( 'rootsVisibleProperty' ),
      phetioFeatured: true,
      phetioDocumentation: 'whether the roots of the quadratic are visible'
    } );

    this.coordinatesVisibleProperty = new BooleanProperty( true, {
      tandem: tandem.createTandem( 'coordinatesVisibleProperty' ),
      phetioFeatured: true,
      phetioDocumentation: 'whether (x,y) coordinates are visible on points that are displayed on the graph'
    } );
  }

  public override reset(): void {
    this.vertexVisibleProperty.reset();
    this.axisOfSymmetryVisibleProperty.reset();
    this.rootsVisibleProperty.reset();
    this.coordinatesVisibleProperty.reset();
    super.reset();
  }
}

graphingQuadratics.register( 'StandardFormViewProperties', StandardFormViewProperties );