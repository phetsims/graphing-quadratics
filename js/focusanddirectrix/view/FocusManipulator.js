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
  const BooleanProperty = require( 'AXON/BooleanProperty' );
  const CoordinatesNode = require( 'GRAPHING_QUADRATICS/common/view/CoordinatesNode' );
  const DerivedProperty = require( 'AXON/DerivedProperty' );
  const DerivedPropertyIO = require( 'AXON/DerivedPropertyIO' );
  const DragListener = require( 'SCENERY/listeners/DragListener' );
  const GQColors = require( 'GRAPHING_QUADRATICS/common/GQColors' );
  const GQConstants = require( 'GRAPHING_QUADRATICS/common/GQConstants' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const Manipulator = require( 'GRAPHING_LINES/common/view/manipulator/Manipulator' );
  const Property = require( 'AXON/Property' );
  const Tandem = require( 'TANDEM/Tandem' );
  const Util = require( 'DOT/Util' );
  const Vector2 = require( 'DOT/Vector2' );
  const Vector2IO = require( 'DOT/Vector2IO' );

  class FocusManipulator extends Manipulator {

    /**
     * @param {number} radius - in view coordinates
     * @param {Property.<Quadratic>} quadraticProperty - the interactive quadratic
     * @param {NumberProperty} pProperty - p coefficient of alternate vertex form
     * @param {Graph} graph
     * @param {ModelViewTransform2} modelViewTransform
     * @param {BooleanProperty} focusVisibleProperty
     * @param {BooleanProperty} coordinatesVisibleProperty
     * @param {Object} [options]
     */
    constructor( radius, quadraticProperty, pProperty, graph, modelViewTransform,
                 focusVisibleProperty, coordinatesVisibleProperty, options ) {

      options = _.extend( {

        // dragging this manipulator changes p to be a multiple of this value, in model coordinate frame
        interval: GQConstants.FOCUS_AND_DIRECTRIX_INTERVAL_P,

        // Manipulator options
        haloAlpha: GQColors.MANIPULATOR_HALO_ALPHA,
        tandem: Tandem.required,
        phetioDocumentation: 'a manipulator for the focus'
      }, options );

      super( radius, GQColors.FOCUS, options );

      // coordinates correspond to the quadratic's focus
      const coordinatesProperty = new DerivedProperty( [ quadraticProperty ],
        quadratic => quadratic.focus, {
          valueType: Vector2,
          tandem: options.tandem.createTandem( 'coordinatesProperty' ),
          phetioType: DerivedPropertyIO( Vector2IO ),
          phetioDocumentation: 'coordinates displayed on the focus manipulator'
        } );

      // coordinates display
      const coordinatesNode = new CoordinatesNode( coordinatesProperty, {
        foregroundColor: 'white',
        backgroundColor: GQColors.FOCUS,
        decimals: GQConstants.FOCUS_DECIMALS,
        pickable: false,
        maxWidth: GQConstants.COORDINATES_MAX_WIDTH
      } );
      this.addChild( coordinatesNode );

      //TODO #711 add options to pass tandem and phetioDocumentation
      // add drag listener
      this.addInputListener( new FocusDragListener( this, pProperty, quadraticProperty, graph.yRange, modelViewTransform,
        options.interval, options.tandem.createTandem( 'dragListener' ) ) );

      // move the manipulator
      quadraticProperty.link( quadratic => {
        assert && assert( quadratic.focus, 'expected focus: ' + quadratic.focus );
        this.translation = modelViewTransform.modelToViewPosition( quadratic.focus );
      } );

      // position coordinates based on which way the parabola opens
      const coordinatesYOffset = 1.8 * radius;
      coordinatesProperty.link( coordinates => {
        coordinatesNode.centerX = 0;
        if ( quadraticProperty.value.a > 0 ) {
          coordinatesNode.bottom = -coordinatesYOffset;
        }
        else {
          coordinatesNode.top = coordinatesYOffset;
        }
      } );

      // visibility of this Node
      const visibleProperty = new BooleanProperty( this.visible );
      visibleProperty.link( visible => {
        this.interruptSubtreeInput(); // cancel any drag that is in progress
        this.visible = visible;
      } );
      Property.multilink( [ focusVisibleProperty, quadraticProperty ], ( focusVisible, quadratic ) => {
        visibleProperty.value = !!( focusVisible && graph.contains( quadratic.focus ) );
      } );

      // visibility of coordinates
      coordinatesVisibleProperty.link( visible => { coordinatesNode.visible = visible; } );
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
     * @param {Tandem} tandem
     */
    constructor( targetNode, pProperty, quadraticProperty, yRange, modelViewTransform, interval, tandem ) {

      assert && assert( pProperty.range, 'pProperty is missing range' );

      let startOffset; // where the drag started, relative to the manipulator

      super( {

        allowTouchSnag: true,

        // note where the drag started
        start: ( event, listener ) => {

          const focus = quadraticProperty.value.focus;
          assert && assert( focus, 'expected focus: ' + focus );

          const location = modelViewTransform.modelToViewPosition( focus );
          startOffset = targetNode.globalToParentPoint( event.pointer.point ).minus( location );
        },

        drag: ( event, listener ) => {

          const vertex = quadraticProperty.value.vertex;
          assert && assert( vertex, 'expected vertex: ' + vertex );

          // transform the drag point from view to model coordinate frame
          const parentPoint = targetNode.globalToParentPoint( event.pointer.point ).minus( startOffset );
          const location = modelViewTransform.viewToModelPosition( parentPoint );

          // constrain to the graph
          const y = yRange.constrainValue( location.y );

          // constrain and round
          let p = pProperty.range.constrainValue( y - vertex.y );
          p = Util.roundToInterval( p, interval );

          // skip over p === 0
          if ( p === 0 ) {
            p = ( pProperty.value < 0 ) ? interval : -interval;
          }
          assert && assert( p !== 0, 'p=0 is not supported' );

          pProperty.value = p;
        },

        tandem: tandem
      } );
    }
  }

  graphingQuadratics.register( 'FocusManipulator.FocusDragListener', FocusDragListener );

  return FocusManipulator;
} );
