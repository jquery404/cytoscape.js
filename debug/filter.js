/* global $, cy */

(function(){

	function selectFromFilter(){
		var selector = $("#filter-selector").value;
		var toSelect = cy.elements(selector);
		
		toSelect.select();
		cy.elements().not(toSelect).unselect();
	}

	function selectWithinBox(){
		var selector = $("#filter-selector").value;
		var toSelect = cy.elements(selector);
		var nodes = cy.nodes().withinBox(toSelect.boundingBox());
		cy.nodes().not(nodes).unselect();
		nodes.select();
	}
	function selectFromPolygonIntersection(){
		var selector = $("#filter-selector").value;
		var toSelect = cy.elements(selector);
		var boxBb = toSelect.boundingBox();
		var polygon = [
			{ x: boxBb.x1, y: boxBb.y1 },
			{ x: boxBb.x2, y: boxBb.y1 },
			{ x: boxBb.x2, y: boxBb.y2 },
			{ x: boxBb.x1, y: boxBb.y2 },
		];
		cy.nodes().polygonIntersection(polygon).select();
	}
	
	$("#filter-witinbox").addEventListener('click', function(){
		selectWithinBox();
	});
	$("#filter-polygonIntersection").addEventListener('click', function(){
		selectFromPolygonIntersection();
	});
	$("#filter-button").addEventListener('click', function(){
		selectFromFilter();
	});

	$("#filter-selector").addEventListener("keydown", function(e){
		if( e.which == 13 ){
			selectFromFilter();
		}
	});

})();
