function printSubset(A, size) {
  for (let i = 0; i < size; i++) {
    console.log(A[i]);
  }
  console.log("\n");
}

// inputs
// s		 - set vector
// t		 - tuplet vector
// s_size	 - set size
// t_size	 - tuplet size so far
// sum		 - sum so far
// ite		 - nodes count
// target_sum - sum to be found
function subset_sum(s, t, s_size, t_size, sum, ite, target_sum) {
  total_nodes++;

  if (target_sum <= sum && Math.abs(sum - target_sum < 5)) {
    // We found sum
    printSubset(t, t_size);

    // constraint check
    if (ite + 1 < s_size && sum - s[ite] + s[ite + 1] <= target_sum) {
      // Exclude previous added item and consider next candidate
      subset_sum(s, t, s_size, t_size - 1, sum - s[ite], ite + 1, target_sum);
    }
    return;
  } else {
    // constraint check
    if (ite < s_size && sum + s[ite] <= target_sum) {
      // generate nodes along the breadth
      for (let i = ite; i < s_size; i++) {
        t[t_size] = s[i];
        if (sum + s[i] <= target_sum) {
          // consider next level node (along depth)
          subset_sum(s, t, s_size, t_size + 1, sum + s[i], i + 1, target_sum);
        }
      }
    }
  }
}

// Wrapper that prints subsets that sum to target_sum
function generateSubsets(arr, size, target_sum) {
  let tuplet_vector = [];
  let total = 0;

  // sort the set
  arr = arr.sort();
  for (let i = 0; i < size; i++) {
    total += arr[i];
  }
  if (arr[0] <= target_sum && total >= target_sum) {
    subset_sum(arr, tuplet_vector, size, 0, 0, 0, target_sum);
  }
}

// Driver code
let total_nodes = 0;
let weights = [15, 22, 14, 26, 32, 9, 16, 8];
let target = 53;
let size = weights.length;
generateSubsets(weights, size, target);
console.log("Nodes generated " + total_nodes);
