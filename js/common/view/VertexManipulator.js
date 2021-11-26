// Copyright 2018-2021, University of Colorado Boulder

/**
 * Manipulator for editing a quadratic by changing its vertex.
 * Displays the coordinates of the vertex.
 *
 * @author Andrea Lin
 * @author Chris Malley (PixelZoom, Inc.)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import Utils from '../../../../dot/js/Utils.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import merge from '../../../../phet-core/js/merge.js';
import { DragListener } from '../../../../scenery/js/imports.js';
import BooleanIO from '../../../../tandem/js/types/BooleanIO.js';
import NullableIO from '../../../../tandem/js/types/NullableIO.js';
import graphingQuadratics from '../../graphingQuadratics.js';
import GQColors from '../GQColors.js';
import GQConstants from '../GQConstants.js';
import GQManipulator from './GQManipulator.js';

// constants
const COORDINATES_Y_SPACING = 1;

class VertexManipulator extends GQManipulator {

  /**
   * @param {NumberProperty} hProperty - h coefficient of the vertex form of the quadratic equation
   * @param {NumberProperty} kProperty - k coefficient of the vertex form of the quadratic equation
   * @param {Property.<Quadratic>} quadraticProperty - the interactive quadratic
   * @param {Graph} graph
   * @param {ModelViewTransform2} modelViewTransform
   * @param {BooleanProperty} vertexVisibleProperty
   * @param {BooleanProperty} coordinatesVisibleProperty
   * @param {Object} [options]
   */
  constructor( hProperty, kProperty, quadraticProperty, graph, modelViewTransform,
               vertexVisibleProperty, coordinatesVisibleProperty, options ) {

    options = merge( {

      // GQManipulator options
      radius: modelViewTransform.modelToViewDeltaX( GQConstants.MANIPULATOR_RADIUS ),
      color: GQColors.VERTEX,
      coordinatesForegroundColor: 'white',
      coordinatesBackgroundColor: GQColors.VERTEX,
      coordinatesDecimals: GQConstants.VERTEX_DECIMALS,

      // phet-io
      phetioDocumentation: 'manipulator for the vertex'

    }, options );

    // position coordinates based on which way the parabola opens
    assert && assert( !options.layoutCoordinates, 'VertexManipulator sets layoutCoordinates' );
    options.layoutCoordinates = ( coordinates, coordinatesNode, radius ) => {
      if ( coordinates ) {
        coordinatesNode.centerX = 0;
        const yOffset = radius + COORDINATES_Y_SPACING;
        if ( quadraticProperty.value.a > 0 ) {
          coordinatesNode.top = yOffset;
        }
        else {
          coordinatesNode.bottom = -yOffset;
        }
      }
    };

    // coordinates correspond to the quadratic's vertex (if it has one)
    const coordinatesProperty = new DerivedProperty( [ quadraticProperty ],
      quadratic => ( quadratic.vertex ? quadratic.vertex : null ), {
        valueType: [ Vector2, null ],
        tandem: options.tandem.createTandem( 'coordinatesProperty' ),
        phetioDocumentation: 'coordinates displayed by on vertex manipulator, null means no vertex',
        phetioType: DerivedProperty.DerivedPropertyIO( NullableIO( Vector2.Vector2IO ) )
      } );

    // visibility of this Node
    assert && assert( !options.visibleProperty, 'VertexManipulator sets visibleProperty' );
    options.visibleProperty = new DerivedProperty(
      [ vertexVisibleProperty, quadraticProperty ],
      ( vertexVisible, quadratic ) =>
        vertexVisible &&  // the Vertex checkbox is checked
        quadratic.isaParabola() &&  // the quadratic is a parabola, so has a vertex
        graph.contains( quadratic.vertex ), // the vertex is on the graph
      {
        tandem: options.tandem.createTandem( 'visibleProperty' ),
        phetioType: DerivedProperty.DerivedPropertyIO( BooleanIO )
      } );

    super( coordinatesProperty, coordinatesVisibleProperty, options );

    // add the drag listener
    this.addInputListener( new VertexDragListener( this, hProperty, kProperty, graph, modelViewTransform, {
      tandem: options.tandem.createTandem( 'dragListener' ),
      phetioDocumentation: 'the drag listener for this vertex manipulator'
    } ) );

    // move the manipulator
    quadraticProperty.link( quadratic => {
      if ( quadratic.vertex ) {
        this.translation = modelViewTransform.modelToViewPosition( quadratic.vertex );
      }
    } );

    options.visibleProperty.link( visible => {
      this.interruptSubtreeInput(); // cancel any drag that is in progress
    } );
  }
}

graphingQuadratics.register( 'VertexManipulator', VertexManipulator );

class VertexDragListener extends DragListener {

  /**
   * Drag handler for vertex.
   * @param {Node} targetNode - the Node that we attached this listener to
   * @param {NumberProperty} hProperty - h coefficient of vertex form
   * @param {NumberProperty} kProperty - k coefficient of vertex form
   * @param {Graph} graph
   * @param {ModelViewTransform2} modelViewTransform
   * @param {Object} [options]
   */
  constructor( targetNode, hProperty, kProperty, graph, modelViewTransform, options ) {

    let startOffset; // where the drag started, relative to the manipulator

    options = merge( {

      allowTouchSnag: true,

      // note where the drag started
      start: ( event, listener ) => {
        const position = modelViewTransform.modelToViewXY( hProperty.value, kProperty.value );
        startOffset = targetNode.globalToParentPoint( event.pointer.point ).minus( position );
      },

      drag: ( event, listener ) => {

        // transform the drag point from view to model coordinate frame
        const parentPoint = targetNode.globalToParentPoint( event.pointer.point ).minus( startOffset );
        let position = modelViewTransform.viewToModelPosition( parentPoint );

        // constrain to the graph
        position = graph.constrain( position );

        // constrain to range and snap to integer grid
        const h = Utils.roundSymmetric( hProperty.range.constrainValue( position.x ) );
        const k = Utils.roundSymmetric( kProperty.range.constrainValue( position.y ) );

        // Setting h and k separately results in an intermediate Quadratic.
        // We decided that this is OK, and we can live with it.
        hProperty.value = h;
        kProperty.value = k;
      }
    }, options );

    super( options );
  }
}

export default VertexManipulator;