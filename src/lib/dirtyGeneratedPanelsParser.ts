import { GeneratedPanel } from "@/types"
import { cleanJson } from "./cleanJson"
import { parseBadJSON } from "./parseBadJSON"

export function dirtyGeneratedPanelsParser(input: string): GeneratedPanel[] {

  if (input.includes("```")) {
    input = input.split("```")[0]
  }
  // we only keep what's after the first [
  let jsonOrNot = cleanJson(input)

  const jsonData = parseBadJSON(jsonOrNot) as GeneratedPanel[]

  const results = jsonData.map((item, i) => {
    let panel = i
    let speech = item.speech ? item.speech.trim() : ''
    let caption = item.caption ? item.caption.trim() : ''
    let instructions = item.instructions ? item.instructions.trim() : ''
    if (!instructions && !caption && speech) {
      instructions = speech
    } else if (!instructions && caption) {
      instructions = caption
    } 
    if (!caption && instructions) {
      caption = instructions
    }
    return { panel, speech, caption, instructions }
  })

  return results
}