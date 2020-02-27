// Copyright 2018-2020, University of Colorado Boulder

/**
 * Displays the vertex as a non-interactive point with coordinates label.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import DerivedPropertyIO from '../../../../axon/js/DerivedPropertyIO.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import Vector2IO from '../../../../dot/js/Vector2IO.js';
import merge from '../../../../phet-core/js/merge.js';
import NullableIO from '../../../../tandem/js/types/NullableIO.js';
import GQColors from '../../common/GQColors.js';
import GQConstants from '../../common/GQConstants.js';
import graphingQuadratics from '../../graphingQuadratics.js';
import PointNode from './PointNode.js';

// constants
const COORDINATES_Y_SPACING = 5;

class VertexNode extends PointNode {

  /**
   * @param {Property.<Quadratic>} quadraticProperty - the interactive quadratic
   * @param {Graph} graph
   * @param {ModelViewTransform2} modelViewTransform
   * @param {BooleanProperty} vertexVisibleProperty
   * @param {BooleanProperty} coordinatesVisibleProperty
   * @param {Object} [options]
   */
  constructor( quadraticProperty, graph, modelViewTransform,
               vertexVisibleProperty, coordinatesVisibleProperty, options ) {

    options = merge( {

      // PointNode options
      radius: modelViewTransform.modelToViewDeltaX( GQConstants.POINT_RADIUS ),
      coordinatesForegroundColor: 'white',
      coordinatesBackgroundColor: GQColors.VERTEX,
      coordinatesDecimals: GQConstants.VERTEX_DECIMALS,

      // phet-io
      phetioDocumentation: 'displays the vertex of the interactive quadratic'

    }, options );

    // position coordinates on the outside of the parabola
    assert && assert( !options.layoutCoordinates, 'VertexNode sets layoutCoordinates' );
    options.layoutCoordinates = ( coordinates, coordinatesNode, pointNode ) => {
      coordinatesNode.centerX = pointNode.centerX;
      if ( quadraticProperty.value.a > 0 ) {
        // center coordinates below a parabola that opens down
        coordinatesNode.top = pointNode.bottom + COORDINATES_Y_SPACING;
      }
      else {
        // center coordinates above a parabola that opens up
        coordinatesNode.bottom = pointNode.top - COORDINATES_Y_SPACING;
      }
    };

    // coordinates correspond to the quadratic's vertex (if it has one)
    const coordinatesProperty = new DerivedProperty( [ quadraticProperty ],
      quadratic => ( quadratic.vertex ? quadratic.vertex : null ), {
        valueType: [ Vector2, null ],
        tandem: options.tandem.createTandem( 'coordinatesProperty' ),
        phetioDocumentation: 'coordinates displayed on the vertex point, null means no vertex',
        phetioType: DerivedPropertyIO( NullableIO( Vector2IO ) )
      } );

    super( coordinatesProperty, coordinatesVisibleProperty, options );

    // move to the vertex position
    quadraticProperty.link( quadratic => {
      if ( quadratic.vertex ) {
        this.translation = modelViewTransform.modelToViewPosition( quadratic.vertex );
      }
    } );

    // visibility of this Node
    const visibleProperty = new DerivedProperty(
      [ vertexVisibleProperty, quadraticProperty ],
      ( vertexVisible, quadratic ) =>
        vertexVisible &&  // the Vertex checkbox is checked
        quadratic.isaParabola() &&  // the quadratic is a parabola, so has a vertex
        graph.contains( quadratic.vertex ) // the vertex is on the graph
    );
    visibleProperty.linkAttribute( this, 'visible' );
  }
}

graphingQuadratics.register( 'VertexNode', VertexNode );
export default VertexNode;