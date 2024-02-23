package helper

func MergeAndRemoveDuplicatesNames(arr1, arr2 []string) []string {
	// Create a map to store unique values
	uniqueValues := make(map[string]bool)

	// Add values from the first array to the map
	for _, v := range arr1 {
		uniqueValues[v] = true
	}

	// Add values from the second array to the map
	for _, v := range arr2 {
		uniqueValues[v] = true
	}

	// Extract unique values from the map to a slice
	var result []string
	for v := range uniqueValues {
		result = append(result, v)
	}

	return result
}

func RemoveDupicatesNames(arr1 []string) []string {
	// Create a map to store unique values
	uniqueValues := make(map[string]bool)
	// Add values from the first array to the map
	for _, v := range arr1 {
		uniqueValues[v] = true
	}
	// Extract unique values from the map to a slice
	var result []string
	for v := range uniqueValues {
		result = append(result, v)
	}
	return result
}
