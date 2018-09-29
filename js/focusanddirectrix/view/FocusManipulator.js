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
     * @param {Graph} graph
     * @param {ModelViewTransform2} modelViewTransform
     * @param {BooleanProperty} focusVisibleProperty
     * @param {BooleanProperty} coordinatesVisibleProperty
     * @param {Object} [options]
     */
    constructor( radius, quadraticProperty, pRange, graph, modelViewTransform,
                 focusVisibleProperty, coordinatesVisibleProperty, options ) {

      options = _.extend( {

        // interval of p value, in model coordinate frame
        interval: GQConstants.FOCUS_AND_DIRECTRIX_INTERVAL_P,

        // Manipulator options
        haloAlpha: GQColors.MANIPULATOR_HALO_ALPHA
      }, options );

      super( radius, GQColors.FOCUS, options );

      //TODO #14 instrument focusProperty?
      // local Property
      const focusProperty = new Property( quadraticProperty.value.focus, {
        valueType: Vector2,
        reentrant: true //TODO #17
      } );

      //TODO #14 instrument coordinatesNode?
      // coordinates displayed on this manipulator
      const coordinatesNode = new CoordinatesNode( focusProperty, {
        foregroundColor: 'white',
        backgroundColor: new Color( GQColors.FOCUS ).withAlpha( 0.75 ),
        decimals: GQConstants.FOCUS_DECIMALS,
        pickable: false
      } );
      this.addChild( coordinatesNode );

      // y offset of coordinates from manipulator
      const coordinatesYOffset = 1.8 * radius;

      const quadraticListener = quadratic => {

        assert && assert( quadratic.focus, 'expected focus: ' + quadratic.focus );
        assert && assert( quadratic.vertex, 'expected vertex: ' + quadratic.vertex );

        // update local Property
        focusProperty.value = quadratic.focus;

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

      // When the focus changes, move the manipulator and create a new quadratic.
      focusProperty.link( focus => {

        const quadratic = quadraticProperty.value;
        assert && assert( quadratic.focus, 'expected focus: ' + quadratic.focus );
        assert && assert( quadratic.vertex, 'expected vertex: ' + quadratic.vertex );

        this.translation = modelViewTransform.modelToViewPosition( focus );

        if ( !focus.equals( quadratic.focus ) ) {
          const p = focus.y - quadratic.vertex.y;
          quadraticProperty.value = Quadratic.createFromAlternateVertexForm( p, quadratic.h, quadratic.k );
        }
      } );

      // visibility
      Property.multilink( [ focusVisibleProperty, focusProperty ], ( focusVisible, focus ) => {
        this.visible = !!( focusVisible && graph.contains( focus ) );
      } );
      coordinatesVisibleProperty.link( visible => { coordinatesNode.visible = visible; } );

      // @private
      this.addInputListener( new FocusDragHandler( quadraticProperty, focusProperty, modelViewTransform,
        pRange, options.interval ) );
    }
  }

  graphingQuadratics.register( 'FocusManipulator', FocusManipulator );

  //TODO #14 instrument FocusDragHandler
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
          assert && assert( vertex, 'expected vertex: ' + vertex );

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
          assert && assert( p !== 0, 'p=0 is not supported' );

          focusProperty.value = new Vector2( vertex.x, vertex.y + p );
        }
      } );
    }
  }

  graphingQuadratics.register( 'FocusManipulator.FocusDragHandler', FocusDragHandler );

  return FocusManipulator;
} );
