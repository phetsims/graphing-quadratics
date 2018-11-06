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
  const BackgroundNode = require( 'GRAPHING_QUADRATICS/common/view/BackgroundNode' );
  const GQConstants = require( 'GRAPHING_QUADRATICS/common/GQConstants' );
  const GQEquationFactory = require( 'GRAPHING_QUADRATICS/common/view/GQEquationFactory' );
  const graphingQuadratics = require( 'GRAPHING_QUADRATICS/graphingQuadratics' );
  const Node = require( 'SCENERY/nodes/Node' );
  const Path = require( 'SCENERY/nodes/Path' );
  const PhetFont = require( 'SCENERY_PHET/PhetFont' );
  const Range = require( 'DOT/Range' );
  const RichText = require( 'SCENERY/nodes/RichText' );
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

      // @private the equation's text
      this.equationText = new RichText( '', {
        font: new PhetFont( GQConstants.GRAPH_EQUATION_FONT_SIZE )
      } );

      // @private equation text on a translucent background
      this.equationNode = new BackgroundNode( this.equationText, {
        maxWidth: 200 // determined empirically
      } );

      // @private Makes positioning and rotating the equation a little easier to grok.
      // equationParent will be rotated and translated, equationNode will be translated to adjust spacing
      // between the equation and its associated curve.
      this.equationParent = new Node( { children: [ this.equationNode ] } );
      this.addChild( this.equationParent );

      // @private ranges for equation placement, just inside the edges of the graph
      this.xEquationRange =
        new Range( xRange.min + GQConstants.EQUATION_X_MARGIN, xRange.max - GQConstants.EQUATION_X_MARGIN );
      this.yEquationRange =
        new Range( yRange.min + GQConstants.EQUATION_Y_MARGIN, yRange.max - GQConstants.EQUATION_Y_MARGIN );

      // updates the equation, but only when it's visible
      const quadraticListener = quadratic => {
        if ( this.visible ) {
          this.update( quadratic );
        }
      };
      quadraticProperty.link( quadraticListener ); // unlink required in dispose

      // updates the equation when it is made visible
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

      // update the equation text
      if ( this.equationForm === 'standard' ) {
        this.equationText.text = GQEquationFactory.createStandardForm( quadratic );
      }
      else {
        this.equationText.text = GQEquationFactory.createVertexForm( quadratic );
      }

      // update the equation color
      this.equationText.fill = quadratic.color;

      // reset the origin for the equation + background
      this.equationNode.x = 0;
      this.equationNode.y = 0;

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
        this.equationNode.bottom = -GQConstants.EQUATION_CURVE_SPACING;
      }
      else {

        // parabola: pick a point on the parabola, at the edge of the graph
        const x = ( quadratic.vertex.x >= 0 ) ? this.xEquationRange.min : this.xEquationRange.max;
        const p = quadratic.getClosestPointInRange( x, this.xEquationRange, this.yEquationRange );
        assert && assert( this.xRange.contains( p.x ) && this.yRange.contains( p.y ), 'p is off the graph: ' + p );

        // Width of the equation in model coordinates
        const equationModelWidth = Math.abs( this.modelViewTransform.viewToModelDeltaX( this.equationNode.width ) );

        if ( this.preventVertexAndEquationOverlap &&
             Math.abs( quadratic.a ) >= 0.75 && // a narrow parabola
             p.distance( quadratic.vertex ) <= equationModelWidth ) {

          // When the equation and vertex are liable to overlap, place the equation (not rotated) to the left or right
          // of the parabola. See https://github.com/phetsims/graphing-quadratics/issues/39#issuecomment-426688827
          this.equationParent.rotation = 0;
          this.equationParent.translation = this.modelViewTransform.modelToViewPosition( p );
          if ( p.x < quadratic.vertex.x ) {
            this.equationNode.right = -GQConstants.EQUATION_CURVE_SPACING;
          }
          else {
            this.equationNode.left = GQConstants.EQUATION_CURVE_SPACING;
          }
          if ( p.y < 0 ) {
            this.equationNode.bottom = 0;
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
            this.equationNode.right = 0;
          }

          // space between tangent line and equation
          if ( quadratic.a >= 0 ) {
            this.equationNode.top = GQConstants.EQUATION_CURVE_SPACING;
          }
          else {
            this.equationNode.bottom = -GQConstants.EQUATION_CURVE_SPACING;
          }
        }
      }
    }
  }

  return graphingQuadratics.register( 'QuadraticNode', QuadraticNode );
} );