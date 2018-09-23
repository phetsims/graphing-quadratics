// Copyright 2018, University of Colorado Boulder

/**
 * Manipulator for editing a quadratic by changing its focus.
 * Displays the coordinates of the focus.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const Color = require( 'SCENERY/util/Color' );
  const CoordinatesNode = require( 'GRAPHING_QUADRATICS/common/view/CoordinatesNode' );
  const GQColors = require( 'GRAPHING_QUADRATICS/common/GQColors' );
  const GQConstants = require( 'GRAPHING_QUADRATICS/common/GQConstants' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const Manipulator = require( 'GRAPHING_LINES/common/view/manipulator/Manipulator' );
  const Property = require( 'AXON/Property' );
  const Quadratic = require( 'GRAPHING_QUADRATICS/common/model/Quadratic' );
  const SimpleDragHandler = require( 'SCENERY/input/SimpleDragHandler' );
  const Util = require( 'DOT/Util' );
  const Vector2 = require( 'DOT/Vector2' );

  class FocusManipulator extends Manipulator {

    /**
     * @param {number} radius - in view coordinates
     * @param {Property.<Quadratic>} quadraticProperty
     * @param {Range} pRange
     * @param {ModelViewTransform2} modelViewTransform
     * @param {BooleanProperty} focusVisibleProperty
     * @param {BooleanProperty} coordinatesVisibleProperty
     * @param {Object} [options]
     */
    constructor( radius, quadraticProperty, pRange, modelViewTransform,
                 focusVisibleProperty, coordinatesVisibleProperty, options ) {

      options = _.extend( {
        interval: 0.1, // interval of p value, in model coordinate frame

        // Manipulator options
        haloAlpha: GQColors.MANIPULATOR_HALO_ALPHA
      }, options );

      super( radius, GQColors.FOCUS, options );

      // local Property whose value is the focus of the current value of quadraticProperty
      const focusProperty = new Property( quadraticProperty.value.focus, {
        valueType: Vector2,
        reentrant: true
      } );

      // dispose not needed
      const coordinatesNode = new CoordinatesNode( focusProperty, {
        foregroundColor: 'white',
        backgroundColor: new Color( GQColors.FOCUS ).withAlpha( 0.75 ),
        decimals: GQConstants.POINT_DECIMALS,
        pickable: false
      } );
      this.addChild( coordinatesNode );

      // y offset of coordinates from manipulator
      const coordinatesYOffset = 1.8 * radius;

      // unlink not needed
      const quadraticListener = quadratic => {

        // manipulator is visible only if the quadratic has a focus
        this.visible = !!( quadratic.focus && focusVisibleProperty.value );

        if ( quadratic.focus && !quadratic.focus.equals( focusProperty.value ) ) {
          focusProperty.value = quadratic.focus;
        }

        // position coordinates based on which way the curve opens
        coordinatesNode.centerX = 0;
        if ( quadraticProperty.value.a > 0 ) {
          coordinatesNode.bottom = -coordinatesYOffset;
        }
        else {
          coordinatesNode.top = coordinatesYOffset;
        }
      };
      quadraticProperty.link( quadraticListener );

      // When the focus changes, create new quadratic.
      focusProperty.link( focus => {
        const quadratic = quadraticProperty.value;
        //TODO handle no vertex
        if ( focus && quadratic.vertex ) {
          if ( focus.x !== quadratic.focus.x || focus.y !== quadratic.focus.y ) {
            const p = focus.y - quadratic.vertex.y;
            quadraticProperty.value = Quadratic.createFromAlternateVertexForm( p, quadratic.h, quadratic.k );
          }
        }
      } );

      // move the manipulator
      focusProperty.link( focus => { this.translation = modelViewTransform.modelToViewPosition( focus ); } );

      focusVisibleProperty.link( visible => { this.visible = visible; } );
      coordinatesVisibleProperty.link( visible => { coordinatesNode.visible = visible; } );

      // @private
      this.addInputListener( new FocusDragHandler( quadraticProperty, focusProperty, modelViewTransform,
        pRange, options.interval ) );
    }
  }

  graphingQuadratics.register( 'FocusManipulator', FocusManipulator );

  class FocusDragHandler extends SimpleDragHandler {

    /**
     * Drag handler for vertex.
     * @param {Property.<Quadratic>} quadraticProperty
     * @param {Property.<Vector2>} focusProperty
     * @param {ModelViewTransform2} modelViewTransform
     * @param {Range} pRange
     * @param {number} interval
     */
    constructor( quadraticProperty, focusProperty, modelViewTransform, pRange, interval ) {

      let startOffset; // where the drag started, relative to the slope manipulator, in parent view coordinates

      super( {

        allowTouchSnag: true,

        // note where the drag started
        start: ( event, trail ) => {
          const location = modelViewTransform.modelToViewPosition( focusProperty.value );
          startOffset = event.currentTarget.globalToParentPoint( event.pointer.point ).minus( location );
        },

        drag: ( event, trail ) => {

          const vertex = quadraticProperty.value.vertex;
          assert && assert( vertex, 'null vertex is not supported' );

          if ( vertex ) {

            // transform the drag point from view to model coordinate frame
            const parentPoint = event.currentTarget.globalToParentPoint( event.pointer.point ).minus( startOffset );
            const location = modelViewTransform.viewToModelPosition( parentPoint );

            // constrain to range
            let p = pRange.constrainValue( location.y - vertex.y );

            p = Util.roundToInterval( p, interval );

            // skip over p === 0
            if ( p === 0 ) {
              p = ( focusProperty.value.y < vertex.y ) ? interval : -interval;
            }
            assert && assert( p !== 0, 'p==0 is not supported' );

            focusProperty.value = new Vector2( vertex.x, vertex.y + p );
          }
        }
      } );
    }
  }

  graphingQuadratics.register( 'FocusManipulator.FocusDragHandler', FocusDragHandler );

  return FocusManipulator;
} );
