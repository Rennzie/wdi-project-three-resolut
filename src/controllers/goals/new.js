function GoalsNewCtrl($http, $scope){
  const userId = $scope.getPayload().sub;

  //need to update teh scope once the setTarget is made
  $scope.setTarget = function() {
    $scope.goal.createdBy = userId;
    const goalData = $scope.goal;
    console.log('Data to update is---->', goalData);
    $http({
      method: 'POST',
      url: `/api/users/${userId}/goals`,
      data: goalData

    })
      .then(response => {
        console.log('the returned data is', response.data.goals);
        $scope.goals = response.data.goals;
      } );
  };
}

//month should auto populate to the current month

export default GoalsNewCtrl;
