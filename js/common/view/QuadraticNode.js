// Copyright 2018, University of Colorado Boulder

/**
 * Visual representation of a quadratic curve.
 *
 * @author Andrea Lin
 */
define( function( require ) {
  'use strict';

  // modules
  const DerivedProperty = require( 'AXON/DerivedProperty' );
  const LineNode = require( 'GRAPHING_LINES/common/view/LineNode' );
  var GQConstants = require( 'GRAPHING_QUADRATICS/common/GQConstants' );
  var graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Path = require( 'SCENERY/nodes/Path' );
  var PlottedPointNode = require( 'GRAPHING_LINES/common/view/PlottedPointNode' );
  var Shape = require( 'KITE/Shape' );
  var Vector2 = require( 'DOT/Vector2' );

  // constants
  var LINE_OPTIONS = {
    lineDash: [ 8, 8 ],
    lineDashOffset: 10
  };

  /**
   * @param {Property.<Quadratic>} quadratic
   * @param {Graph} graph
   * @param {ModelViewTransform2} modelViewTransform
   * @param {LineFormsScreenView} viewProperties
   * @param {Object} [options]
   * @constructor
   */
  function QuadraticNode( quadraticProperty, graph, modelViewTransform, viewProperties, options ) {

    options = _.extend( {}, options );

    Node.call( this, options );

    var quadraticPath = new Path( null, {
      stroke: 'red',
      lineWidth: 3
    } );

    var pointRadius = modelViewTransform.modelToViewDeltaX( GQConstants.POINT_RADIUS );

    // vertex of the quadratic
    var vertexPoint = new PlottedPointNode( pointRadius, 'red' );
    var vertexPointParentNode = new Node( { children: [ vertexPoint ] } );

    // link vertex point visibility to view property
    viewProperties.vertexVisibleProperty.link( function( visible ) {
      vertexPointParentNode.visible = visible;
    } );

    // the left most root if there are two roots, and the root if there is one root
    var root0Point = new PlottedPointNode( pointRadius, 'red' );

    // the right most root if there are two roots
    var root1Point = new PlottedPointNode( pointRadius, 'red' );

    var rootPointsParentNode = new Node( { children: [ root0Point, root1Point ] } );

    // link roots points to view property
    viewProperties.rootsVisibleProperty.link( function( visible ) {
      rootPointsParentNode.visible = visible;
    } );

    // make a property out of quadraticProperty.get().axisOfSymmetry in order to pass into LineNode
    var axisOfSymmetryLineProperty = new DerivedProperty( [ quadraticProperty ], function( quadratic ) {
      return quadratic.axisOfSymmetry;
    } );

    // use the double headed arrow node from graphing-lines as a guide
    var axisOfSymmetryLine = new LineNode( axisOfSymmetryLineProperty, graph, modelViewTransform, {
      hasArrows: false,
      lineOptions: LINE_OPTIONS
    } );

    var axisOfSymmetryLineParentNode = new Node( { children: [ axisOfSymmetryLine ] } );

    // link axis of symmetry line visibility to view property
    viewProperties.axisOfSymmetryVisibleProperty.link( function( visible ) {
      axisOfSymmetryLineParentNode.visible = visible;
    } );

    // focus of the quadratic
    var focusPoint = new PlottedPointNode( pointRadius, 'green' );

    // make a property out of quadraticProperty.get().directrix in order to pass into LineNode
    var directrixLineProperty = new DerivedProperty( [ quadraticProperty ], function( quadratic ) {
      return quadratic.directrix;
    } );

    // use the double headed arrow node from graphing-lines as a guide
    var directrixLine = new LineNode( directrixLineProperty, graph, modelViewTransform, {
      hasArrows: false,
      lineOptions: LINE_OPTIONS
    } );

    var directrixParentNode = new Node( { children: [ directrixLine, focusPoint ] } );

    // link focus point and directrix line visibility to view property
    viewProperties.directrixVisibleProperty.link( function( visible ) {
      directrixParentNode.visible = visible;
    } );

    // rendering order
    this.addChild( quadraticPath );
    this.addChild( axisOfSymmetryLineParentNode );
    this.addChild( vertexPointParentNode );
    this.addChild( directrixParentNode );
    this.addChild( rootPointsParentNode );

    // Update the view of the curve when the quadratic model changes
    // TODO: dispose
    quadraticProperty.link( function( quadratic ) {

      // given coefficients, calculate control points for the quadratic bezier curve
      // see https://github.com/phetsims/graphing-quadratics/issues/1
      var a = quadratic.a;
      var b = quadratic.b;
      var c = quadratic.c;
      var minX = graph.xRange.min;
      var maxX = graph.xRange.max;
      var xRange = graph.xRange.getLength();

      var aPrime = a * xRange * xRange;
      var bPrime = 2 * a * minX * xRange + b * xRange;
      var cPrime = a * minX * minX + b * minX + c;

      var startPoint = new Vector2( minX, cPrime );
      var controlPoint = new Vector2( ( minX + maxX ) / 2, bPrime / 2 + cPrime );
      var endPoint = new Vector2( maxX, aPrime + bPrime + cPrime );

      // draw the quadratic
      var quadraticShape = new Shape()
        .moveToPoint( startPoint)
        .quadraticCurveToPoint( controlPoint, endPoint )
        .transformed( modelViewTransform.getMatrix() )
      ;

      quadraticPath.setShape( quadraticShape );

      // update other information about the quadratic curve
      if ( a !== 0 ) {
        vertexPoint.center = modelViewTransform.modelToViewPosition( quadratic.vertex );
        focusPoint.center = modelViewTransform.modelToViewPosition( quadratic.focus );
        vertexPoint.visible = true;
        focusPoint.visible = true;

        if ( quadratic.roots.length === 2 ) { // two real roots
          root0Point.center = modelViewTransform.modelToViewPosition( quadratic.roots[ 0 ] );
          root1Point.center = modelViewTransform.modelToViewPosition( quadratic.roots[ 1 ] );
          root0Point.visible = true;
          root1Point.visible = true;
        }
        else if ( quadratic.roots.length === 1 ) { // two real roots
          root0Point.center = modelViewTransform.modelToViewPosition( quadratic.roots[ 0 ] );
          root0Point.visible = true;
          root1Point.visible = false;

        }
        else { // no real roots
          root0Point.visible = false;
          root1Point.visible = false;
        }
      }
      else { // not quadratic
        vertexPoint.visible = false;
        focusPoint.visible = false;
        root0Point.visible = false;
        root1Point.visible = false;
      }
    } );

  }

  graphingQuadratics.register( 'QuadraticNode', QuadraticNode );

  return inherit( Node, QuadraticNode, {

    /**
     * Convenience method for creating a quadratic path with a different color.
     * @param {Color|String}
     *
     * @public
     */
    withColor: function( color ) {
      return new Path( this.quadraticPath.getShape(), {
        stroke: color,
        lineWidth: 3
      } );
    }
  });
} );