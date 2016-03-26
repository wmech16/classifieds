(function() {

	"use strict";

	angular
		.module("classifieds")
		.controller("classifiedsCtrl", function($scope, $state, $http, classifiedsFactory, $mdSidenav, $mdToast, $mdDialog) {

			var vm = this;



			vm.categories;
			vm.classified;
			vm.classifieds;
			vm.closeSidebar     = closeSidebar;
			vm.deleteClassified = deleteClassified;
			vm.editClassified   = editClassified;
			vm.editing;
			vm.openSidebar      = openSidebar;
			vm.saveClassified   = saveClassified;
			vm.saveEdit 			  = saveEdit;

			vm.classifieds = classifiedsFactory.ref;
			vm.classifieds.$loaded().then(function(classifieds) {
				vm.categories = getCategories(classifieds);
			});


			$scope.$on('editSaved', function(event, message) {
				showToast(message);
			})

			$scope.$on('newClassified', function(event, classified) {
				vm.classifieds.$add(classified);
				showToast('classified saved!');
			})

			var contact = {
				name: "Billy Mech",
				phone: "(407) 555-5555",
				email: "wmrvh@gmail.com"
			}


			function openSidebar() {
				$state.go('classifieds.new');
			}

			function closeSidebar() {
				$mdSidenav('left').close();
			}

			function saveClassified(classified) {
				if(classified) {
					classified.contact = contact;
					vm.classifieds.push(classified);
					vm.classified = {};
					closeSidebar();
					showToast("Classified Saved!");
				}
			}
			function editClassified(classified) {
				$state.go('classifieds.edit', {
					id: classified.$id
				});
			}

			function saveEdit() {
				vm.editing = false;
				vm.classified = {};
				closeSidebar();
				showToast("Edit Saved!");

			}

			function deleteClassified(event, classified) {
				var confirm = $mdDialog.confirm()
					.title('Are you sure you want to delete ' + classified.title + '?')
					.ok('Yes')
					.cancel('No')
					.targetEvent(event);
				$mdDialog.show(confirm).then(function() {
					vm.classifieds.$remove(classified);
					showToast('Classified Deleted');
				}, function() {

				});
			}

			function showToast(message) {
				$mdToast.show(
					$mdToast.simple()
						.content("message")
						.position('top, right')
						.hideDelay(3000)
				);
			}

			function getCategories(classifieds) {

				var categories = [];

				angular.forEach(classifieds, function(item) {
					angular.forEach(item.categories, function(category) {
						categories.push(category);
					})
				});

				return _.uniq(categories);
			}

		});
})();