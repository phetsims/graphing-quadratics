// Copyright 2018-2020, University of Colorado Boulder

/**
 * Manipulator for editing a quadratic by changing its focus.
 * Displays the coordinates of the focus.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import Utils from '../../../../dot/js/Utils.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import merge from '../../../../phet-core/js/merge.js';
import DragListener from '../../../../scenery/js/listeners/DragListener.js';
import GQColors from '../../common/GQColors.js';
import GQConstants from '../../common/GQConstants.js';
import GQManipulator from '../../common/view/GQManipulator.js';
import graphingQuadratics from '../../graphingQuadratics.js';

// constants
const COORDINATES_Y_SPACING = 1;

class FocusManipulator extends GQManipulator {

  /**
   * @param {NumberProperty} pProperty - p coefficient of alternate vertex form
   * @param {Property.<Quadratic>} quadraticProperty - the interactive quadratic
   * @param {Graph} graph
   * @param {ModelViewTransform2} modelViewTransform
   * @param {BooleanProperty} focusVisibleProperty
   * @param {BooleanProperty} coordinatesVisibleProperty
   * @param {Object} [options]
   */
  constructor( pProperty, quadraticProperty, graph, modelViewTransform,
               focusVisibleProperty, coordinatesVisibleProperty, options ) {

    options = merge( {

      // dragging this manipulator changes p to be a multiple of this value, in model coordinate frame
      interval: GQConstants.FOCUS_AND_DIRECTRIX_INTERVAL_P,

      // GQManipulator options
      radius: modelViewTransform.modelToViewDeltaX( GQConstants.MANIPULATOR_RADIUS ),
      color: GQColors.FOCUS,
      coordinatesForegroundColor: 'white',
      coordinatesBackgroundColor: GQColors.FOCUS,
      coordinatesDecimals: GQConstants.FOCUS_DECIMALS,

      // phet-io
      phetioDocumentation: 'manipulator for the focus'

    }, options );

    // position coordinates based on which way the parabola opens
    assert && assert( !options.layoutCoordinates, 'FocusManipulator sets layoutCoordinates' );
    options.layoutCoordinates = ( coordinates, coordinatesNode, radius ) => {
      assert && assert( coordinates, 'expected coordinates' );
      coordinatesNode.centerX = 0;
      const yOffset = radius + COORDINATES_Y_SPACING;
      if ( quadraticProperty.value.a > 0 ) {
        coordinatesNode.bottom = -yOffset;
      }
      else {
        coordinatesNode.top = yOffset;
      }
    };

    // coordinates correspond to the quadratic's focus
    const coordinatesProperty = new DerivedProperty( [ quadraticProperty ],
      quadratic => quadratic.focus, {
        valueType: Vector2,
        tandem: options.tandem.createTandem( 'coordinatesProperty' ),
        phetioType: DerivedProperty.DerivedPropertyIO( Vector2.Vector2IO ),
        phetioDocumentation: 'coordinates displayed on the focus manipulator'
      } );

    super( coordinatesProperty, coordinatesVisibleProperty, options );

    // add the drag listener
    this.addInputListener( new FocusDragListener( this, pProperty, quadraticProperty, graph.yRange,
      modelViewTransform, options.interval, {
        tandem: options.tandem.createTandem( 'dragListener' ),
        phetioDocumentation: 'drag listener for this focus manipulator'
      } ) );

    // move the manipulator
    quadraticProperty.link( quadratic => {
      assert && assert( quadratic.focus, 'expected focus: ' + quadratic.focus );
      this.translation = modelViewTransform.modelToViewPosition( quadratic.focus );
    } );

    // visibility of this Node
    const visibleProperty = new DerivedProperty(
      [ focusVisibleProperty, quadraticProperty ],
      ( focusVisible, quadratic ) =>
        focusVisible && // the Focus checkbox is checked
        graph.contains( quadratic.focus ) // the focus is on the graph
    );
    visibleProperty.link( visible => {
      this.interruptSubtreeInput(); // cancel any drag that is in progress
      this.visible = visible;
    } );
  }
}

graphingQuadratics.register( 'FocusManipulator', FocusManipulator );

class FocusDragListener extends DragListener {

  /**
   * Drag handler for focus.
   * @param {Node} targetNode - the Node that we attached this listener to
   * @param {NumberProperty} pProperty - p coefficient of alternate vertex form
   * @param {Property.<Quadratic>} quadraticProperty - the interactive quadratic
   * @param {Range} yRange - range of the graph's y axis
   * @param {ModelViewTransform2} modelViewTransform
   * @param {number} interval
   * @param {Object} [options]
   */
  constructor( targetNode, pProperty, quadraticProperty, yRange, modelViewTransform, interval, options ) {

    assert && assert( pProperty.range, 'pProperty is missing range' );

    let startOffset; // where the drag started, relative to the manipulator

    options = merge( {

      allowTouchSnag: true,

      // note where the drag started
      start: ( event, listener ) => {

        const focus = quadraticProperty.value.focus;
        assert && assert( focus, 'expected focus: ' + focus );

        const position = modelViewTransform.modelToViewPosition( focus );
        startOffset = targetNode.globalToParentPoint( event.pointer.point ).minus( position );
      },

      drag: ( event, listener ) => {

        const vertex = quadraticProperty.value.vertex;
        assert && assert( vertex, 'expected vertex: ' + vertex );

        // transform the drag point from view to model coordinate frame
        const parentPoint = targetNode.globalToParentPoint( event.pointer.point ).minus( startOffset );
        const position = modelViewTransform.viewToModelPosition( parentPoint );

        // constrain to the graph
        const y = yRange.constrainValue( position.y );

        // constrain and round
        let p = pProperty.range.constrainValue( y - vertex.y );
        p = Utils.roundToInterval( p, interval );

        // skip over p === 0
        if ( p === 0 ) {
          p = ( pProperty.value > 0 ) ? interval : -interval;
        }
        assert && assert( p !== 0, 'p=0 is not supported' );

        pProperty.value = p;
      }
    }, options );

    super( options );
  }
}

export default FocusManipulator;