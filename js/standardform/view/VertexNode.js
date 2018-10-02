// Copyright 2018, University of Colorado Boulder

/**
 * Displays the vertex as a non-interactive point with coordinates label.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const Circle = require( 'SCENERY/nodes/Circle' );
  const DerivedProperty = require( 'AXON/DerivedProperty' );
  const DerivedPropertyIO = require( 'AXON/DerivedPropertyIO' );
  const CoordinatesNode = require( 'GRAPHING_QUADRATICS/common/view/CoordinatesNode' );
  const GQColors = require( 'GRAPHING_QUADRATICS/common/GQColors' );
  const GQConstants = require( 'GRAPHING_QUADRATICS/common/GQConstants' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const Node = require( 'SCENERY/nodes/Node' );
  const Property = require( 'AXON/Property' );
  const Tandem = require( 'TANDEM/Tandem' );
  const Vector2 = require( 'DOT/Vector2' );
  const Vector2IO = require( 'DOT/Vector2IO' );

  // ifphetio
  const NullableIO = require( 'ifphetio!PHET_IO/types/NullableIO' );

  // constants
  const Y_SPACING = 5;

  class VertexNode extends Node {

    /**
     * @param {Property.<Quadratic>} quadraticProperty
     * @param {GQGraph} graph
     * @param {ModelViewTransform2} modelViewTransform
     * @param {BooleanProperty} vertexVisibleProperty
     * @param {BooleanProperty} coordinatesVisibleProperty
     * @param {Object} [options]
     */
    constructor( quadraticProperty, graph, modelViewTransform,
                 vertexVisibleProperty, coordinatesVisibleProperty, options ) {

      options = _.extend( {
        radius: 10,
        tandem: Tandem.required
      }, options );

      const pointNode = new Circle( options.radius, {
        fill: GQColors.VERTEX,
        x: 0,
        y: 0
      } );

      // coordinates correspond to the quadratic's vertex (if it has one)
      const coordinatesProperty = new DerivedProperty( [ quadraticProperty ],
        quadratic => ( quadratic.vertex ? quadratic.vertex : null ), {
          isValidValue: value => ( value instanceof Vector2 || value === null ),
          tandem: options.tandem.createTandem( 'coordinatesProperty' ),
          phetioType: DerivedPropertyIO( NullableIO( Vector2IO ) ),
          phetioInstanceDocumentation: 'coordinates displayed on the vertex point, null means no vertex'
        } );

      // displays the vertex coordinates
      const coordinatesNode = new CoordinatesNode( coordinatesProperty, {
        foregroundColor: 'white',
        backgroundColor: GQColors.VERTEX,
        decimals: GQConstants.VERTEX_DECIMALS
      } );

      assert && assert( !options.children, 'VertexNode sets children' );
      options.children = [ pointNode, coordinatesNode ];

      super( options );

      // position coordinates on the outside of the curve
      coordinatesProperty.link( coordinates => {
        coordinatesNode.centerX = pointNode.centerX;
        if ( quadraticProperty.value.a > 0 ) {
          coordinatesNode.top = pointNode.bottom + Y_SPACING;
        }
        else {
          coordinatesNode.bottom = pointNode.top - Y_SPACING;
        }
      } );

      // move to the vertex location
      quadraticProperty.link( quadratic => {
        if ( quadratic.vertex ) {
          this.translation = modelViewTransform.modelToViewPosition( quadratic.vertex );
        }
      } );

      Property.multilink( [ vertexVisibleProperty, quadraticProperty ],
        ( vertexVisible, quadratic ) => {
          this.visible = !!( vertexVisible &&
                             quadratic.vertex &&
                             graph.contains( quadratic.vertex ) );
        } );

      coordinatesVisibleProperty.link( visible => { coordinatesNode.visible = visible; } );
    }
  }

  return graphingQuadratics.register( 'VertexNode', VertexNode );
} );