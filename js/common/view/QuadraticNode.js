// Copyright 2018, University of Colorado Boulder

/**
 * Draws a quadratic curve, labeled with an equation.
 * Performance is optimized to update only what's visible.
 *
 * @author Andrea Lin
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const Circle = require( 'SCENERY/nodes/Circle' );
  const GQConstants = require( 'GRAPHING_QUADRATICS/common/GQConstants' );
  const GQEquationFactory = require( 'GRAPHING_QUADRATICS/common/view/GQEquationFactory' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const Node = require( 'SCENERY/nodes/Node' );
  const Path = require( 'SCENERY/nodes/Path' );
  const Range = require( 'DOT/Range' );
  const Shape = require( 'KITE/Shape' );

  class QuadraticNode extends Node {

    /**
     * @param {Property.<Quadratic>} quadraticProperty - the quadratic to be rendered
     * @param {Range} xRange - range of the graph's x axis
     * @param {Range} yRange - range of the graph's y axis
     * @param {ModelViewTransform2} modelViewTransform
     * @param {string} equationForm - form of the equation displayed on the curve, see GQConstants.EQUATION_FORMS
     * @param {BooleanProperty} equationsVisibleProperty
     * @param {Object} [options]
     */
    constructor( quadraticProperty, xRange, yRange, modelViewTransform, equationForm,
                 equationsVisibleProperty, options ) {

      assert && assert( GQConstants.EQUATION_FORMS.includes( equationForm ),
        'invalid equationForm: ' + equationForm );

      options = _.extend( {

        // prevent a parabola's vertex and equation from overlapping
        preventVertexAndEquationOverlap: true,

        // Path options
        lineWidth: 1
      }, options );

      super( options );

      // @private
      this.quadraticProperty = quadraticProperty;
      this.xRange = xRange;
      this.yRange = yRange;
      this.modelViewTransform = modelViewTransform;
      this.equationForm = equationForm;
      this.preventVertexAndEquationOverlap = options.preventVertexAndEquationOverlap;

      // @protected quadratic curve, y = ax^2 + bx + c
      this.quadraticPath = new Path( null, {
        lineWidth: options.lineWidth
      } );
      this.addChild( this.quadraticPath );

      // @private Makes positioning and rotating the equation a little easier to grok.
      // equationParent will be rotated and translated, equationNode will be translated to adjusts spacing.
      this.equationParent = new Node();
      this.addChild( this.equationParent );

      // @private ranges for equation placement, just inside the edges of the graph
      this.xEquationRange =
        new Range( xRange.min + GQConstants.EQUATION_X_MARGIN, xRange.max - GQConstants.EQUATION_X_MARGIN );
      this.yEquationRange =
        new Range( yRange.min + GQConstants.EQUATION_Y_MARGIN, yRange.max - GQConstants.EQUATION_Y_MARGIN );

      const quadraticListener = quadratic => {
        if ( this.visible ) {
          this.update( quadratic );
        }
      };
      quadraticProperty.link( quadraticListener ); // unlink required in dispose

      const equationsVisibleListener = visible => {
        this.equationParent.visible = visible;
        if ( visible ) {
          this.updateEquation( this.quadraticProperty.value );
        }
      };
      equationsVisibleProperty.link( equationsVisibleListener ); // unlink required in dispose

      // @private
      this.disposeQuadraticNode = () => {
        if ( quadraticProperty.hasListener( quadraticListener ) ) {
          quadraticProperty.unlink( quadraticListener );
        }
        if ( equationsVisibleProperty.hasListener( equationsVisibleListener ) ) {
          equationsVisibleProperty.unlink( equationsVisibleListener );
        }
      };
    }

    /**
     * @public
     * @override
     */
    dispose() {
      super.dispose();
      this.disposeQuadraticNode();
    }

    /**
     * Sets the visibility of this Node.  Update is deferred until this Node becomes visible.
     * @param {boolean} visible
     * @public
     * @override
     */
    setVisible( visible ) {
      super.setVisible( visible );
      if ( visible ) {
        this.update( this.quadraticProperty.value );
      }
    }

    /**
     * Updates this Node to display the specified quadratic.
     * @param {Quadratic} quadratic
     * @private
     */
    update( quadratic ) {
      
      // update shape
      const bezierControlPoints = quadratic.getControlPoints( this.xRange );
      this.quadraticPath.shape = new Shape()
        .moveToPoint( bezierControlPoints.startPoint )
        .quadraticCurveToPoint( bezierControlPoints.controlPoint, bezierControlPoints.endPoint )
        .transformed( this.modelViewTransform.getMatrix() );

      // update color
      this.quadraticPath.stroke = quadratic.color;

      // update equation
      this.updateEquation( quadratic );
    }

    /**
     * Updates the equation displayed on the quadratic.
     * @param {Quadratic} quadratic
     * @private
     */
    updateEquation( quadratic ) {

      this.equationParent.removeAllChildren();

      let equationNode = null;
      if ( this.equationForm === 'standard' ) {
        equationNode = GQEquationFactory.createStandardForm( quadratic );
      }
      else {
        equationNode = GQEquationFactory.createVertexForm( quadratic );
      }
      equationNode.maxWidth = 200; // determined empirically
      this.equationParent.addChild( equationNode );

      // if ?dev, display a black dot at the equation's origin, for debugging positioning
      if ( phet.chipper.queryParameters.dev ) {
        this.equationParent.addChild( new Circle( 3, { fill: 'black' } ) );
      }

      // Position the equation.
      if ( quadratic.a === 0 ) {

        // straight line: equation above left end of line
        const x = this.xEquationRange.min;
        const p = quadratic.getClosestPointInRange( x, this.xEquationRange, this.yEquationRange );
        assert && assert( this.xRange.contains( p.x ) && this.yRange.contains( p.y ), 'p is off the graph: ' + p );

        // rotate to match line's slope
        this.equationParent.rotation = -Math.atan( quadratic.b );

        // move equation to (x,y)
        this.equationParent.translation = this.modelViewTransform.modelToViewPosition( p );

        // space between line and equation
        equationNode.bottom = -GQConstants.EQUATION_SPACING;
      }
      else {

        // parabola: pick a point on the parabola, at the edge of the graph
        const x = ( quadratic.vertex.x >= 0 ) ? this.xEquationRange.min : this.xEquationRange.max;
        const p = quadratic.getClosestPointInRange( x, this.xEquationRange, this.yEquationRange );
        assert && assert( this.xRange.contains( p.x ) && this.yRange.contains( p.y ), 'p is off the graph: ' + p );

        // Width of the equation in model coordinates
        const equationModelWidth = Math.abs( this.modelViewTransform.viewToModelDeltaX( equationNode.width ) );

        if ( this.preventVertexAndEquationOverlap &&
             Math.abs( quadratic.a ) >= 0.75 && // a narrow parabola
             p.distance( quadratic.vertex ) <= equationModelWidth ) {

          // When the equation and vertex are liable to overlap, place the equation (not rotated) to the left or right
          // of the parabola. See https://github.com/phetsims/graphing-quadratics/issues/39#issuecomment-426688827
          this.equationParent.rotation = 0;
          this.equationParent.translation = this.modelViewTransform.modelToViewPosition( p );
          if ( p.x < quadratic.vertex.x ) {
            equationNode.right = -GQConstants.EQUATION_SPACING;
          }
          else {
            equationNode.left = GQConstants.EQUATION_SPACING;
          }
          if ( p.y < 0 ) {
            equationNode.bottom = 0;
          }
        }
        else {

          // Place the equation on outside of the parabola, parallel to tangent line, at the edge of the graph.
          // rotate to match tangent's slope
          this.equationParent.rotation = -Math.atan( quadratic.getTangentSlope( p.x ) );

          // move equation to (x,y)
          this.equationParent.translation = this.modelViewTransform.modelToViewPosition( p );

          // when equation is on the right side of parabola, move it's origin to the right end of the equation
          if ( p.x > quadratic.vertex.x ) {
            equationNode.right = 0;
          }

          // space between tangent line and equation
          if ( quadratic.a >= 0 ) {
            equationNode.top = GQConstants.EQUATION_SPACING;
          }
          else {
            equationNode.bottom = -GQConstants.EQUATION_SPACING;
          }
        }
      }
    }
  }

  return graphingQuadratics.register( 'QuadraticNode', QuadraticNode );
} );