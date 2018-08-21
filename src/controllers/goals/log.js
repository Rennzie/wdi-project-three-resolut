function GoalsEditCtrl($http, $scope, $state){
  $scope.logHours = true;

  $http({
    method: 'GET',
    url: `/api/users/${$state.params.id}/goals`
  })
    .then(res => {
      const userGoals = res.data.filter(goal => goal.createdBy === $scope.getPayload().sub );

      const currentMonthGoals = userGoals.filter(goal => goal.goalMonth === $scope.currentMonth);

      console.log('the users goals are ', currentMonthGoals);
      $scope.goal = currentMonthGoals[0];
    });

  $scope.logHoursSubmit = function() {
    $http({
      method: 'PUT',
      url: `/api/goals/${$state.params.goalId}/loghours`,
      data: $scope.goal
    })
      .then(res =>{
        $scope.goal = res.data;
        $state.go('usersShow', {id: $scope.getPayload().sub});
      });
  };
}

export default GoalsEditCtrl;