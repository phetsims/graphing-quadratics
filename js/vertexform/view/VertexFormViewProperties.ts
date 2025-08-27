// Copyright 2018-2023, University of Colorado Boulder

/**
 * View-specific Properties and properties for the 'Vertex Form' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Tandem from '../../../../tandem/js/Tandem.js';
import GQViewProperties from '../../common/view/GQViewProperties.js';
import graphingQuadratics from '../../graphingQuadratics.js';
import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import Property from '../../../../axon/js/Property.js';

export default class VertexFormViewProperties extends GQViewProperties {

  public readonly vertexVisibleProperty: Property<boolean>;
  public readonly axisOfSymmetryVisibleProperty: Property<boolean>;
  public readonly coordinatesVisibleProperty: Property<boolean>;

  public constructor( tandem: Tandem ) {
    super( {
      equationForm: 'vertex',
      tandem: tandem
    } );

    this.vertexVisibleProperty = new BooleanProperty( true, {
      tandem: tandem.createTandem( 'vertexVisibleProperty' ),
      phetioFeatured: true,
      phetioDocumentation: 'whether the vertex point or manipulator is visible'
    } );

    this.axisOfSymmetryVisibleProperty = new BooleanProperty( false, {
      tandem: tandem.createTandem( 'axisOfSymmetryVisibleProperty' ),
      phetioFeatured: true,
      phetioDocumentation: 'whether the axis of symmetry is visible'
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
    this.coordinatesVisibleProperty.reset();
    super.reset();
  }
}

graphingQuadratics.register( 'VertexFormViewProperties', VertexFormViewProperties );